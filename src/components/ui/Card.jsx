import React from 'react';

export const Card = ({ children, className = '', noPadding = false, hover = false }) => {
  const hoverEffects = hover 
    ? 'hover:-translate-y-1 hover:-translate-x-1 hover:brutal-shadow-hover active:translate-y-1 active:translate-x-1 active:brutal-shadow-sm cursor-pointer brutal-transition' 
    : '';
    
  const hasBg = className && className.includes('bg-');
  return (
    <div className={`${hasBg ? '' : 'bg-white'} brutal-border brutal-shadow ${noPadding ? '' : 'p-6'} ${hoverEffects} ${className}`}>
      {children}
    </div>
  );
};
