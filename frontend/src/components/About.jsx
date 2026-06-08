import React, { useEffect, useState } from 'react';
import { Code, Palette, Zap } from 'lucide-react';
import { aboutContent } from '../mockData';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              {aboutContent.title}
            </h2>
          </div>

          <Card className="bg-gray-900/50 backdrop-blur-lg border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
            <CardContent className="p-8">
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {aboutContent.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-800/50 border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/10 group">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 transition-all duration-300 group-hover:rotate-12">
                    <Code className="text-amber-400" size={24} />
                  </div>
                  <h3 className="text-amber-400 font-semibold mb-2">Clean Code</h3>
                  <p className="text-gray-400 text-sm">Píšu čitelný a udržovatelný kód</p>
                </div>

                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-800/50 border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/10 group">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 transition-all duration-300 group-hover:rotate-12">
                    <Palette className="text-amber-400" size={24} />
                  </div>
                  <h3 className="text-amber-400 font-semibold mb-2">Modern Design</h3>
                  <p className="text-gray-400 text-sm">Vytvářím moderní a responzivní UI</p>
                </div>

                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-800/50 border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/10 group">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 transition-all duration-300 group-hover:rotate-12">
                    <Zap className="text-amber-400" size={24} />
                  </div>
                  <h3 className="text-amber-400 font-semibold mb-2">Performance</h3>
                  <p className="text-gray-400 text-sm">Optimalizuji pro rychlost a výkon</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-amber-400 mb-4">Technologie & dovednosti</h3>
                <div className="flex flex-wrap gap-3">
                  {aboutContent.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-amber-500/30 text-amber-400 bg-amber-500/10 px-4 py-2 text-sm hover:bg-amber-500/20 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;