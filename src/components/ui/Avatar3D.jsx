import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export const Avatar3D = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid mouse tracking
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-window.innerHeight / 2, window.innerHeight / 2], [25, -25]), springConfig);
  const rotateY = useSpring(useTransform(x, [-window.innerWidth / 2, window.innerWidth / 2], [-35, 35]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      x.set(e.clientX - window.innerWidth / 2);
      y.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center lg:justify-end" style={{ perspective: '1200px' }}>
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d" 
        }}
        className="relative w-48 h-48 md:w-64 md:h-64 pointer-events-none"
      >
        {/* Style blocks to apply responsive half-widths (96px for mapping to w-48, 128px mapping to w-64) */}
        <style>{`
          .face-front { transform: translateZ(96px); }
          .face-back { transform: rotateY(180deg) translateZ(96px); }
          .face-right { transform: rotateY(90deg) translateZ(96px); }
          .face-left { transform: rotateY(-90deg) translateZ(96px); }
          .face-top { transform: rotateX(90deg) translateZ(96px); }
          .face-bottom { transform: rotateX(-90deg) translateZ(96px); }
          
          @media (min-width: 768px) {
            .face-front { transform: translateZ(128px); }
            .face-back { transform: rotateY(180deg) translateZ(128px); }
            .face-right { transform: rotateY(90deg) translateZ(128px); }
            .face-left { transform: rotateY(-90deg) translateZ(128px); }
            .face-top { transform: rotateX(90deg) translateZ(128px); }
            .face-bottom { transform: rotateX(-90deg) translateZ(128px); }
          }
        `}</style>
        
        {/* FRONT FACE (The Face) */}
        <div className="face-front absolute inset-0 bg-primary-brutal brutal-border flex flex-col items-center justify-center gap-6">
          {/* Eyes */}
          <div className="flex gap-8 mt-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-black brutal-border rounded-lg -rotate-12 animate-pulse" />
            <div className="w-8 h-8 md:w-10 md:h-10 bg-black brutal-border rounded-lg rotate-12 animate-pulse" />
          </div>
          {/* Mouth */}
          <div className="w-16 h-4 md:w-20 md:h-6 bg-black brutal-border" />
        </div>
        
        {/* BACK FACE */}
        <div className="face-back absolute inset-0 bg-black brutal-border" />
        
        {/* RIGHT FACE */}
        <div className="face-right absolute inset-0 bg-white brutal-border">
          <div className="w-full h-full flex items-center justify-center overflow-hidden opacity-20">
            {/* Grid pattern */}
            <div className="w-[150%] h-[150%] bg-[linear-gradient(rgba(0,0,0,1)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,1)_2px,transparent_2px)] bg-[size:1rem_1rem]" />
          </div>
        </div>
        
        {/* LEFT FACE */}
        <div className="face-left absolute inset-0 bg-white brutal-border">
           <div className="w-full h-full flex items-center justify-center font-display font-black text-6xl rotate-90 opacity-20">
             MKN.
           </div>
        </div>
        
        {/* TOP FACE */}
        <div className="face-top absolute inset-0 bg-secondary-brutal brutal-border" />
        
        {/* BOTTOM FACE */}
        <div className="face-bottom absolute inset-0 bg-black brutal-border" />
      </motion.div>
    </div>
  );
};
