import React, { useEffect, useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background elements with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl animate-pulse" 
          style={{ 
            animationDelay: '1s',
            transform: `translate(${-mousePosition.x * 20}px, ${-mousePosition.y * 20}px)`
          }}
        ></div>
        
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-400/30 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Sparkle decoration */}
          <div className="flex justify-center mb-4">
            <Sparkles className="text-amber-400 w-8 h-8 animate-pulse" />
          </div>
          
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold mb-6 text-amber-400 relative drop-shadow-[0_0_30px_rgba(252,211,77,0.5)]">
            Adames
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl text-gray-300 mb-3 font-light tracking-wide">
            Web & App Developer
          </p>
          <p className="text-sm sm:text-base text-amber-400/80 mb-8 font-semibold tracking-[0.3em] uppercase">
            ADEVteam
          </p>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Vytvářím moderní webové aplikace a digitální produkty s důrazem na kvalitu a uživatelskou přívětivost.
          </p>
          <Button
            onClick={scrollToProjects}
            className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold px-8 py-6 text-lg rounded-lg shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <span className="relative">Zobrazit projekty</span>
            <ChevronDown className="inline-block ml-2 group-hover:translate-y-1 transition-transform duration-300" size={20} />
          </Button>
        </div>
      </div>

      {/* Scroll indicator with pulse */}
      <button
        onClick={scrollToProjects}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-amber-400 hover:text-amber-300 transition-colors animate-bounce"
      >
        <div className="relative">
          <ChevronDown size={32} />
          <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
        </div>
      </button>
    </section>
  );
};

export default Hero;