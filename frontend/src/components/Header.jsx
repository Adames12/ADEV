import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-amber-500/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent hover:from-amber-300 hover:to-yellow-500 transition-all duration-300 hover:scale-110"
          >
            Adames
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('projects')}
              className="text-gray-300 hover:text-amber-400 transition-all duration-300 relative group"
            >
              Projekty
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-amber-400 transition-all duration-300 relative group"
            >
              O mně
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-amber-400 transition-all duration-300 relative group"
            >
              Kontakt
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-amber-400 hover:bg-amber-500/10 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            <button
              onClick={() => scrollToSection('projects')}
              className="text-gray-300 hover:text-amber-400 transition-all duration-300 text-left hover:translate-x-2"
            >
              Projekty
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-amber-400 transition-all duration-300 text-left hover:translate-x-2"
            >
              O mně
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-amber-400 transition-all duration-300 text-left hover:translate-x-2"
            >
              Kontakt
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;