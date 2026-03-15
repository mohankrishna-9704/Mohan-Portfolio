import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const Projects = () => {
  const projects = [
    {
      title: "Fake News Detection",
      description: "A machine learning model designed to classify news articles as real or fake, utilizing natural language processing and various classification algorithms.",
      tech: ["Python", "Machine Learning", "NLP"],
      github: "https://github.com/mohankrishna-9704",
      live: "#",
      color: "bg-primary-brutal"
    },
    {
      title: "Smart Medicine Storage",
      description: "Working on an IoT and ML-based quality monitoring and expiry alerting system for medicine storage to ensure safety and efficiency.",
      tech: ["IoT", "ML", "Python", "Sensors"],
      github: "https://github.com/mohankrishna-9704",
      live: "#",
      color: "bg-secondary-brutal text-white"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-5xl md:text-7xl font-black font-display uppercase mb-12 flex items-center gap-4">
          <span className="text-primary-brutal">*</span>
          Featured Work
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card hover noPadding className="h-full flex flex-col overflow-hidden group">
              <div className={`h-48 ${project.color} brutal-border-b flex items-center justify-center relative overflow-hidden brutal-transition group-hover:bg-black`}>
                <img 
                  src={`https://picsum.photos/seed/${project.title.replace(/\s+/g, '')}/800/600`} 
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-60 brutal-transition scale-110 group-hover:scale-100 mix-blend-overlay"
                />
                <h3 className="text-3xl font-black text-bg-brutal font-display z-10 px-4 text-center group-hover:scale-110 group-hover:text-white brutal-transition drop-shadow-[2px_2px_0_#111111]">
                  {project.title.split(' ')[0]}
                </h3>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold font-display mb-3">{project.title}</h3>
                <p className="mb-6 font-medium text-gray-800 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map(t => (
                    <Badge key={t} color="white">{t}</Badge>
                  ))}
                </div>
                
                <div className="flex gap-4 mt-auto">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="dark" className="w-full gap-2">
                      <Github className="w-4 h-4" /> Code
                    </Button>
                  </a>
                  {project.live !== "#" && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="white" className="w-full gap-2">
                        <ExternalLink className="w-4 h-4" /> Live
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
