import React, { useState } from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <Header />
      <main className="relative">
        {/* Hero Section */}
        <div className="relative z-10">
          <Hero />
        </div>
        
        {/* Wave transition to Projects */}
        <div className="relative h-32 -mt-32">
          <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,64 C360,20 720,20 1080,64 C1260,86 1350,96 1440,64 L1440,120 L0,120 Z" 
                  fill="url(#gradient1)" opacity="0.3"/>
            <path d="M0,80 C360,40 720,40 1080,80 C1260,100 1350,110 1440,80 L1440,120 L0,120 Z" 
                  fill="url(#gradient2)" opacity="0.2"/>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#F59E0B', stopOpacity: 0.1}} />
                <stop offset="50%" style={{stopColor: '#FBBF24', stopOpacity: 0.15}} />
                <stop offset="100%" style={{stopColor: '#F59E0B', stopOpacity: 0.1}} />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#F59E0B', stopOpacity: 0.05}} />
                <stop offset="50%" style={{stopColor: '#FBBF24', stopOpacity: 0.1}} />
                <stop offset="100%" style={{stopColor: '#F59E0B', stopOpacity: 0.05}} />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Projects Section with smooth background */}
        <div className="relative bg-gradient-to-b from-gray-900/50 to-black pt-16">
          <Projects />
        </div>
        
        {/* Gradient transition */}
        <div className="h-32 bg-gradient-to-b from-black to-gray-900/50"></div>
        
        {/* About Section */}
        <div className="relative bg-gradient-to-b from-gray-900/50 to-black">
          <About />
        </div>
        
        {/* Gradient transition */}
        <div className="h-32 bg-gradient-to-b from-black to-gray-900/30"></div>
        
        {/* Contact Section */}
        <div className="relative bg-gradient-to-b from-gray-900/30 to-black">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;