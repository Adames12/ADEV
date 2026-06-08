import React, { useState } from 'react';
import { Mail, Github, MapPin, Send, CheckCircle } from 'lucide-react';
import { contactInfo } from '../mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.status === 200 || response.status === 201) {
        setIsSuccess(true);
        toast({
          title: "Zpráva odeslána!",
          description: "Děkuji za vaši zprávu. Ozvu se co nejdříve.",
        });
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success animation after 3 seconds
        setTimeout(() => setIsSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Chyba při odesílání",
        description: error.response?.data?.detail || "Nepodařilo se odeslat zprávu. Zkuste to prosím později.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            Kontakt
          </h2>
          <p className="text-gray-400 text-lg">
            Máte projekt nebo nápad? Napište mi!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 backdrop-blur-lg border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
              <CardHeader>
                <CardTitle className="text-amber-400">Kontaktní informace</CardTitle>
                <CardDescription className="text-gray-400">
                  Ozvat se mi můžete několika způsoby
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-gray-300 hover:text-amber-400 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-all duration-300 group-hover:scale-110">
                    <Mail size={20} className="text-amber-400" />
                  </div>
                  <span className="hover:underline">{contactInfo.email}</span>
                </a>

                <div className="flex items-center gap-3 text-gray-300 group">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-all duration-300">
                    <Github size={20} className="text-amber-400" />
                  </div>
                  <span className="text-gray-400">{contactInfo.github}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-300 group">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-all duration-300">
                    <MapPin size={20} className="text-amber-400" />
                  </div>
                  <span>{contactInfo.location}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className={`bg-gray-900/50 backdrop-blur-lg border-amber-500/20 transition-all duration-500 ${
            isSuccess ? 'scale-105 border-green-500/40 shadow-lg shadow-green-500/20' : ''
          }`}>
            <CardHeader>
              <CardTitle className="text-amber-400 flex items-center gap-2">
                {isSuccess ? (
                  <>
                    <CheckCircle className="animate-bounce" size={24} />
                    Odesláno!
                  </>
                ) : (
                  'Napište mi'
                )}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {isSuccess ? 'Zpráva byla úspěšně odeslána' : 'Vyplňte formulář a ozvu se vám co nejdříve'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="group">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Vaše jméno"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-800/50 border-amber-500/20 focus:border-amber-500/40 text-white placeholder:text-gray-500 transition-all duration-300 group-hover:border-amber-500/30"
                  />
                </div>
                <div className="group">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Váš email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-800/50 border-amber-500/20 focus:border-amber-500/40 text-white placeholder:text-gray-500 transition-all duration-300 group-hover:border-amber-500/30"
                  />
                </div>
                <div className="group">
                  <Textarea
                    name="message"
                    placeholder="Vaše zpráva"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-gray-800/50 border-amber-500/20 focus:border-amber-500/40 text-white placeholder:text-gray-500 resize-none transition-all duration-300 group-hover:border-amber-500/30"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2"></div>
                      Odesílám...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      Odeslat zprávu
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;