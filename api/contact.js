const sgMail = require("@sendgrid/mail");

const sendgridApiKey = process.env.SENDGRID_API_KEY;

module.exports = async function contactHandler(request, response) {
  // 1. Nastavení CORS hlaviček pro komunikaci s GitHub Pages
  response.setHeader("Access-Control-Allow-Credentials", true);
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  response.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Content-Type");

  // Ošetření předběžného dotazu prohlížeče (Preflight OPTIONS request)
  if (request.method === "OPTIONS") {
    return response.status(200).end();
  }

  // Kontrola, zda jde o POST požadavek
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ message: "Pouzijte POST pozadavek." });
  }

  // Kontrola API klíče
  if (!sendgridApiKey) {
    return response.status(500).json({ message: "Chybi nastaveni SENDGRID_API_KEY ve Vercelu." });
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
      to: "adamjedlicka1020@gmail.com",       // Opraveno: Přidány uvozovky
      from: "teamadev.info@gmail.com",     // Opraveno: Přidány uvozovky (Tento mail musí být ověřený v SendGridu!)
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
    console.error("SendGrid error logs:", error); // Tohle vypíše detail chyby do Vercel logů, pokud to selže
    return response.status(500).json({ message: "SendGrid zpravu neodeslal." });
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
