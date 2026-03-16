import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const sections = [
  { id: 'home', label: '01. HOME' },
  { id: 'projects', label: '02. WORK' },
  { id: 'skills', label: '03. SKILLS' },
  { id: 'experience', label: '04. JOURNEY' },
  { id: 'contact', label: '05. CONNECT' }
];

export const SideNav = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      // Pick the entry with the largest intersecting ratio if multiple
      const intersecting = entries.filter(e => e.isIntersecting);
      if (intersecting.length > 0) {
        setActiveSection(intersecting[0].target.id);
      }
    };

    let observer;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(handleIntersect, observerOptions);
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.observe(el);
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // Adjust for header/padding
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden fixed top-20 right-4 z-50 p-2 brutal-border bg-bg-brutal hover:bg-text-brutal hover:text-bg-brutal brutal-transition brutal-shadow-sm group mt-1"
      >
        <Menu className="w-6 h-6 text-text-brutal group-hover:text-bg-brutal" />
      </button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-bg-brutal brutal-border-l brutal-shadow-lg p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-display font-black text-xl tracking-tighter">NAVIGATION</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 brutal-border hover:bg-primary-brutal hover:text-white brutal-transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={`text-left font-mono font-bold text-xl brutal-transition border-b-2 pb-2 ${
                      activeSection === section.id 
                        ? 'text-primary-brutal border-primary-brutal pl-4' 
                        : 'text-text-brutal border-transparent hover:border-text-brutal hover:pl-2'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
              
              <div className="mt-auto mb-8">
               <a href="https://github.com/mohankrishna-9704" target="_blank" rel="noopener noreferrer" className="block w-full brutal-border bg-text-brutal text-bg-brutal text-center py-3 font-bold uppercase hover:-translate-y-1 brutal-transition brutal-shadow-sm">
                 GitHub Profile
               </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Dot Navigation */}
      <div className="hidden md:flex fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-8">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const isHovered = hoveredSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              className="group relative flex items-center"
            >
              {/* Dot - Diamond shape */}
              <div className={`w-3 h-3 brutal-border-sm transition-all duration-300 rotate-45 ${
                isActive ? 'bg-primary-brutal scale-150' : 'bg-bg-brutal group-hover:bg-primary-brutal'
              }`} />
              
              {/* Label */}
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 10 }}
                    exit={{ opacity: 0, x: -10 }}
                    className={`absolute left-4 font-mono text-xs font-black tracking-widest whitespace-nowrap brutal-border-sm px-2 py-1 z-50 ${
                      isActive ? 'bg-text-brutal text-bg-brutal' : 'bg-bg-brutal text-text-brutal shadow-sm'
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
    </>
  );
};
