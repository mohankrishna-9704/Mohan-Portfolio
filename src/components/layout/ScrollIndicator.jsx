import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useIdle } from '../../lib/hooks';

export const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showTopBtn, setShowTopBtn] = useState(false);
  const isIdle = useIdle(5000);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div 
        animate={{ opacity: isIdle ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 right-0 w-3 h-full bg-border-brutal/10 z-[60] border-l-4 border-border-brutal hidden md:block pointer-events-none"
      >
        <motion.div
          className="w-full bg-primary-brutal origin-top"
          style={{ height: '100%', scaleY }}
        />
      </motion.div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: isIdle ? 0 : (showTopBtn ? 1 : 0), 
          y: showTopBtn ? 0 : 50 
        }}
        transition={{ duration: 0.5 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-[60] p-4 bg-primary-brutal text-bg-brutal brutal-border brutal-shadow-sm hover:-translate-y-2 hover:brutal-shadow-hover hover:bg-bg-brutal hover:text-text-brutal brutal-transition ${(showTopBtn && !isIdle) ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <ArrowUp className="w-6 h-6 stroke-[3px]" />
      </motion.button>
    </>
  );
};
