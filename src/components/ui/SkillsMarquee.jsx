import React from 'react';
import { motion } from 'framer-motion';

const SKILLS = [
  "Python", "Machine Learning", "NLP", "SQL", "C++", "IoT", "Pandas", 
  "NumPy", "scikit-learn", "Data Analysis", "Predictive Modeling", "GitHub",
  "Jupyter", "Deep Learning", "Arduino", "Data Pipelines", "Research"
];

export const SkillsMarquee = () => {
  const doubled = [...SKILLS, ...SKILLS]; // Duplicate to create seamless loop

  return (
    <div className="overflow-hidden border-y-4 border-border-brutal bg-bg-brutal py-4 relative">
      {/* Left fade */}
      <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-bg-brutal to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-bg-brutal to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 w-max"
      >
        {doubled.map((skill, i) => (
          <span key={i} className="font-mono font-black text-sm uppercase flex items-center gap-4 whitespace-nowrap text-text-brutal">
            {skill}
            <span className="w-2 h-2 bg-primary-brutal rounded-full shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};
