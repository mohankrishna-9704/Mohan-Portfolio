import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Primary Blueprint Grid */}
      <div className="absolute inset-0 opacity-[0.08]" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      
      {/* Secondary Sub-grid */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {/* Decorative Crosshairs (Blueprint Markers) */}
      <div className="absolute top-[10%] left-[10%] w-10 h-10 opacity-30">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black" />
      </div>
      <div className="absolute top-[40%] right-[15%] w-10 h-10 opacity-30">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black" />
      </div>
      <div className="absolute bottom-[20%] left-[20%] w-10 h-10 opacity-30">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black" />
      </div>

      {/* Floating Shapes */}
      <motion.div
        animate={{
          y: [0, -50, 0],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-10 w-20 h-20 bg-primary-brutal/10 brutal-border opacity-30 hidden md:block"
      />

      <motion.div
        animate={{
          x: [0, 50, 0],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/3 right-10 w-32 h-32 rounded-full bg-secondary-brutal/10 brutal-border opacity-30 hidden lg:block"
      />

      {/* Random small geometric sparks */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [0, 0.4, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute w-2 h-2 bg-text-brutal opacity-20"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `-${Math.random() * 20}vh`
          }}
        />
      ))}
    </div>
  );
};
