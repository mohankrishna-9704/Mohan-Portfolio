import React from 'react';

export const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center brutal-border brutal-shadow brutal-transition font-display font-bold px-6 py-3 active:translate-x-1 active:translate-y-1 active:brutal-shadow-sm hover:-translate-y-1 hover:-translate-x-1 hover:brutal-shadow-hover';
  
  const variants = {
    primary: 'bg-primary-brutal text-white',
    secondary: 'bg-secondary-brutal text-white',
    tertiary: 'bg-white text-text-brutal',
    white: 'bg-white text-text-brutal',
    dark: 'bg-secondary-brutal text-white'
  };

  return (
    <button className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
};
