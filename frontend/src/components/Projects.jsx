import React, { useState, useEffect } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { projects } from '../mockData';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleProjects((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const projectElements = document.querySelectorAll('.project-card');
    projectElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            Projekty
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ukázka mých nejnovějších projektů a webových aplikací
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              data-index={index}
              className={`project-card transform transition-all duration-700 ${
                visibleProjects.includes(index)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Card className="bg-gray-900/50 backdrop-blur-lg border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-2 h-full flex flex-col group relative overflow-hidden">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-48 object-cover transition-all duration-500 ${
                      hoveredProject === index ? 'scale-110 brightness-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  
                  {/* Floating icon on hover */}
                  <div className={`absolute top-4 right-4 bg-amber-500 p-2 rounded-full transition-all duration-300 ${
                    hoveredProject === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}>
                    <ArrowUpRight size={20} className="text-black" />
                  </div>
                </div>
                
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl text-amber-400 group-hover:text-amber-300 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="border-amber-500/30 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="relative z-10">
                  <Button
                    variant="outline"
                    className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300 hover:border-amber-500/50 transition-all group/btn"
                    onClick={() => window.open(project.demoUrl, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:rotate-45 transition-transform duration-300" />
                    Zobrazit projekt
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
