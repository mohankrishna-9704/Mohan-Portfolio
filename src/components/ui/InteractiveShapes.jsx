import React from 'react';
import { motion } from 'framer-motion';

export const InteractiveShapes = () => {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center lg:justify-end">
      <div className="relative w-64 h-64">
        {/* Central drag instruction */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-20 hidden md:flex">
          <span className="font-mono font-black text-xs text-text-brutal uppercase text-center">Drag<br/>Me!</span>
        </div>
        
        {/* Main Block */}
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          whileHover={{ scale: 1.05 }}
          whileDrag={{ scale: 1.1, rotate: 5, zIndex: 50 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary-brutal brutal-border brutal-shadow cursor-grab active:cursor-grabbing flex items-center justify-center z-10"
        >
          <div className="w-16 h-16 border-4 border-white rounded-full opacity-50" />
        </motion.div>

        {/* Orbiting element 1 */}
        <motion.div
          drag
          dragConstraints={{ left: -50, right: 150, top: -150, bottom: 50 }}
          whileHover={{ scale: 1.1 }}
          whileDrag={{ scale: 1.2, zIndex: 50 }}
          animate={{ x: [0, 20, 0], y: [0, -20, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-4 -right-4 w-20 h-20 bg-secondary-brutal brutal-border brutal-shadow cursor-grab active:cursor-grabbing z-20 flex items-center justify-center"
        >
          <span className="font-display font-black text-2xl text-white">X</span>
        </motion.div>

        {/* Orbiting element 2 */}
        <motion.div
          drag
          dragConstraints={{ left: -150, right: 50, top: -50, bottom: 150 }}
          whileHover={{ scale: 1.1 }}
          whileDrag={{ scale: 1.2, zIndex: 50 }}
          animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-8 -left-8 w-16 h-16 bg-bg-brutal brutal-border brutal-shadow cursor-grab active:cursor-grabbing z-30 rounded-full flex items-center justify-center border-4 border-text-brutal"
        >
          <div className="w-4 h-4 bg-primary-brutal rounded-full" />
        </motion.div>
        
        {/* Orbiting element 3 */}
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          whileHover={{ scale: 1.1 }}
          whileDrag={{ scale: 1.2, zIndex: 50 }}
          animate={{ y: [0, 20, 0], rotate: [0, -45, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-10 right-0 w-12 h-12 bg-text-brutal brutal-border brutal-shadow cursor-grab active:cursor-grabbing z-40 transform rotate-12"
        />
      </div>
    </div>
  );
};
