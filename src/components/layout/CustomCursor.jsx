import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Check if hovering over clickable elements
      if (
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.closest('button') ||
        e.target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Glow Effect */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 bg-primary-brutal/30 rounded-full pointer-events-none z-[90] blur-2xl"
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.3
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-transparent border-2 border-primary-brutal rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'var(--color-primary-brutal)' : 'transparent',
          borderWidth: isHovering ? '0px' : '2px'
        }}
        transition={{
          type: "spring",
          stiffness: 750,
          damping: 28,
          mass: 0.5
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-text-brutal rounded-full pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0
        }}
      />
    </>
  );
};
