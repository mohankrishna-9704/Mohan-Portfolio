import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'home', label: '01. HOME' },
  { id: 'projects', label: '02. WORK' },
  { id: 'skills', label: '03. SKILLS' },
  { id: 'experience', label: '04. EDU' },
  { id: 'contact', label: '05. CONNECT' }
];

export const SideNav = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-6 md:gap-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        
        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="group relative flex items-center"
          >
            {/* Dot */}
            <div className={`w-3 h-3 brutal-border-sm transition-all duration-300 ${
              isActive ? 'bg-primary-brutal scale-150 rotate-45' : 'bg-white group-hover:bg-primary-brutal group-hover:rotate-45'
            }`} />
            
            {/* Label */}
            <AnimatePresence>
              {(isHovered || isActive) && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 10 }}
                  exit={{ opacity: 0, x: -10 }}
                  className={`absolute left-4 font-mono text-xs font-black tracking-widest whitespace-nowrap brutal-border-sm px-2 py-1 hidden md:block ${
                    isActive ? 'bg-black text-white' : 'bg-white text-black'
                  }`}
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
};
