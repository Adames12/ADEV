const sgMail = require("@sendgrid/mail");

const fromEmail = process.env.FROM_EMAIL;
const toEmail = process.env.TO_EMAIL;
const sendgridApiKey = process.env.SENDGRID_API_KEY;

module.exports = async function contactHandler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ message: "Pouzijte POST pozadavek." });
  }

  if (!sendgridApiKey || !fromEmail || !toEmail) {
    return response.status(500).json({ message: "Chybi nastaveni e-mailu." });
  }

  const { name, email, message } = request.body || {};
  const cleanName = String(name || "").trim();
  const cleanEmail = String(email || "").trim();
  const cleanMessage = String(message || "").trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return response.status(400).json({ message: "Vyplnte vsechna pole." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return response.status(400).json({ message: "E-mail neni ve spravnem tvaru." });
  }

  sgMail.setApiKey(sendgridApiKey);

  try {
    await sgMail.send({
      to: toEmail,
      from: fromEmail,
      replyTo: cleanEmail,
      subject: `Nova zprava z webu Team ADEV od ${cleanName}`,
      text: [
        `Jmeno: ${cleanName}`,
        `E-mail: ${cleanEmail}`,
        "",
        "Zprava:",
        cleanMessage,
      ].join("\n"),
      html: `
        <h2>Nova zprava z webu Team ADEV</h2>
        <p><strong>Jmeno:</strong> ${escapeHtml(cleanName)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(cleanEmail)}</p>
        <p><strong>Zprava:</strong></p>
        <p>${escapeHtml(cleanMessage).replace(/\n/g, "<br>")}</p>
      `,
    });

    return response.status(200).json({ message: "Zprava byla odeslana." });
  } catch (error) {
    const sendgridError = error.response?.body?.errors?.[0]?.message || error.message;
    console.error("SendGrid error:", error.response?.body || error.message);

    return response.status(500).json({
      message: getPublicSendgridMessage(sendgridError),
    });
  }
};

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getPublicSendgridMessage(message = "") {
  const lowerMessage = String(message).toLowerCase();

  if (lowerMessage.includes("permission") || lowerMessage.includes("access forbidden")) {
    return "SendGrid klic nema opravneni Mail Send.";
  }

  if (lowerMessage.includes("verified sender") || lowerMessage.includes("sender identity")) {
    return "FROM_EMAIL neni overeny v SendGridu jako odesilatel.";
  }

  if (lowerMessage.includes("api key") || lowerMessage.includes("authorization")) {
    return "SendGrid API klic je spatny, smazany nebo neni spravne vlozeny ve Vercelu.";
  }

  if (lowerMessage.includes("from")) {
    return "SendGrid odmita odesilaci e-mail. Zkontrolujte FROM_EMAIL v SendGridu.";
  }

  return "SendGrid zpravu neodeslal. Otevrete Vercel Logs pro presny duvod.";
}
