import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Wrap any section with this to get a block-wipe reveal on scroll entry.
 * Usage: <SectionReveal color="bg-primary-brutal"><YourSection /></SectionReveal>
 */
export const SectionReveal = ({ children, color = 'bg-primary-brutal', className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* The content — fades in after the wipe */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.01, delay: 0.55 }}
      >
        {children}
      </motion.div>

      {/* Wipe block — slides in then out */}
      <motion.div
        className={`absolute inset-0 ${color} z-20 origin-left`}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: [0, 1, 1, 0] } : { scaleX: 0 }}
        transition={{
          duration: 0.7,
          times: [0, 0.4, 0.6, 1],
          ease: ['easeIn', 'linear', 'easeOut'],
        }}
        style={{ transformOrigin: 'left center' }}
      />
    </div>
  );
};
