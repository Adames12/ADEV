import React from 'react';
import { Github, Mail, Heart } from 'lucide-react';
import { contactInfo } from '../mockData';

const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-lg border-t border-amber-500/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Adames. Všechna práva vyhrazena.
            </p>
            <p className="text-gray-500 text-sm mt-1 flex items-center justify-center md:justify-start gap-1">
              Vytvořeno s <Heart size={14} className="text-amber-500" /> a moderními technologiemi
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-gray-400 hover:text-amber-400 transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-amber-400 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;