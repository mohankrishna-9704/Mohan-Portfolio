import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = ({ onComplete }) => {
  const [loadingText, setLoadingText] = useState('');
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  const steps = [
    "Initializing Portfolio…",
    "Loading Projects…",
    "Compiling Experience…",
    "Launching Interface…"
  ];

  useEffect(() => {
    // Progress bar effect
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const nextProgress = prev + Math.floor(Math.random() * 8) + 2;
        
        if (nextProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        
        if (nextProgress > 75) setStep(3);
        else if (nextProgress > 50) setStep(2);
        else if (nextProgress > 25) setStep(1);
        
        return nextProgress;
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  useEffect(() => {
    // Typing effect for current step
    let currentIndex = 0;
    const currentString = steps[step];
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= currentString.length) {
        setLoadingText(currentString.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);
    
    return () => clearInterval(typingInterval);
  }, [step]);

  return (
    <motion.div 
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] bg-bg-brutal flex flex-col items-center justify-center p-8 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Animated Blocks */}
        <div className="flex justify-center gap-4 mb-12">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`w-12 h-12 brutal-border brutal-shadow ${
                i === 0 ? 'bg-primary-brutal' : i === 1 ? 'bg-secondary-brutal' : 'bg-tertiary-brutal'
              }`}
              animate={{ 
                rotate: [0, 90, 180, 270, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </div>

        {/* Text */}
        <div className="font-mono text-lg font-bold mb-4 h-8 flex justify-between items-end">
          <span>{loadingText}<span className="animate-pulse">_</span></span>
          <span>{Math.min(progress, 100)}%</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-8 brutal-border bg-white p-1">
          <motion.div 
            className="h-full bg-text-brutal"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};
