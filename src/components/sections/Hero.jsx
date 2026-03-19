import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, ArrowRight, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { InteractiveShapes } from '../ui/InteractiveShapes';
import { DraggableStickers } from '../ui/DraggableStickers';

export const Hero = () => {
  const [typingText, setTypingText] = useState('');
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const fullText = "> Data Scientist | Final Year CSE\n> SQL | Python | C++";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypingText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen pt-16 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden" id="home">
      <div className="hidden md:block">
        <DraggableStickers />
      </div>

      {/* Mobile Top Decor - Fills empty space */}
      <div className="md:hidden flex flex-col mb-12 opacity-80 pointer-events-none">
        <div className="flex justify-between items-end border-b-2 border-border-brutal pb-2">
          <div className="font-mono text-[10px] font-black leading-none uppercase">
            <span className="text-primary-brutal">#</span> User_Session_Init
          </div>
          <div className="font-mono text-[9px] uppercase tracking-tighter">
            Loc: 13.21°N, 79.10°E
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="font-mono text-[8px] uppercase tracking-widest">Auth: Guest_User</div>
          <div className="font-mono text-[8px] uppercase tracking-widest text-primary-brutal animate-pulse">● System_Online</div>
        </div>
      </div>
      
      {/* Floating Elements (Border Charcoal & Primary Red) */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-48 right-12 lg:right-32 w-24 h-24 bg-primary-brutal brutal-border brutal-shadow opacity-90 hidden md:block"
      />
      
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: -15 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-10 lg:left-24 rounded-full w-32 h-32 bg-secondary-brutal brutal-border brutal-shadow opacity-90 hidden md:block"
      />
      
      {/* Decorative Crosshairs */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 opacity-50 hidden lg:block pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border-brutal" />
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-border-brutal" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          <div className="lg:col-span-8 flex flex-col items-start pt-4">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[2.75rem] sm:text-6xl lg:text-[5.5rem] xl:text-[7rem] font-black font-display tracking-tighter leading-[0.9] mb-6 uppercase text-text-brutal drop-shadow-[4px_4px_0_#1A1A1A]"
            >
              DATA SCIENCE & <br/> TECH DEVELOPING
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:max-w-3xl mb-10"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-text-brutal text-bg-brutal brutal-border-sm md:brutal-border brutal-shadow-sm md:brutal-shadow p-4 md:p-6 transform -rotate-1 cursor-pointer group hover:rotate-0 transition-all duration-300 relative z-20"
                onClick={() => {
                  console.log("Card clicked");
                  setIsAboutExpanded(!isAboutExpanded);
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-display font-black text-xl uppercase tracking-tighter text-primary-brutal">
                    {isAboutExpanded ? "[-] Close Bio" : "[+] Read About Me"}
                  </span>
                  <span className="font-mono text-xs opacity-50">v1.2.0_stable</span>
                </div>
                
                <AnimatePresence>
                  {isAboutExpanded ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="font-mono text-lg leading-relaxed pt-4 border-t border-tertiary-brutal/20">
                        Hello! I'm Mohan Krishna, a passionate Data Scientist and final-year CSE student dedicated to uncovering hidden insights within complex datasets. My journey in technology is driven by a profound curiosity about how data can be leveraged to solve real-world problems and optimize decision-making processes. 
                        <br/><br/>
                        With a solid foundation in SQL, Python, and C++, I specialize in building predictive models, designing efficient data pipelines, and exploring the frontiers of Machine Learning. My technical toolkit includes everything from natural language processing to IoT-based smart systems, allowing me to approach challenges from both a backend and analytical perspective.
                        <br/><br/>
                        I thrive in environments that challenge my problem-solving skills and allow me to continuously learn and adapt. Whether it's developing an IoT solution for smart medicine storage or refining a fake news detection model, my goal is always to deliver impactful, data-driven results. 
                        <br/><br/>
                        Outside of core development, I'm an avid tech enthusiast constantly exploring emerging trends in AI and tech architecture. I believe in the power of clean code and robust systems, ensuring that every project I touch is built for scalability and performance. Let's connect and build the next generation of intelligent solutions together!
                      </p>
                    </motion.div>
                  ) : (
                    <p className="font-mono text-xl sm:text-2xl font-bold leading-snug">
                       Curious Data Scientist solving real-world problems through code and analysis.
                    </p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 sm:gap-6 w-full sm:w-auto"
            >
              <Button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className="text-xl py-4 sm:w-auto w-full group">
                Let's Build Something <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="flex gap-4 w-full sm:w-auto">
                <a href="https://github.com/mohankrishna-9704" target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                  <Button variant="white" className="p-4 w-full justify-center">
                    <Github className="w-6 h-6" />
                  </Button>
                </a>
                <a href="https://www.linkedin.com/in/mohan-krishna-180b40364/" target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                  <Button variant="white" className="p-4 w-full justify-center">
                    <Linkedin className="w-6 h-6" />
                  </Button>
                </a>
                <a 
                  href="/Mohan%20Krishna%20Patam%20Resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 sm:flex-none"
                  download="Mohan_Krishna_Patam_Resume.pdf"
                  title="View & Download Resume"
                >
                  <Button variant="white" className="p-4 w-full justify-center text-primary-brutal">
                    <FileText className="w-6 h-6" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
            className="lg:col-span-4 hidden lg:flex items-center justify-end"
          >
             <InteractiveShapes />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
