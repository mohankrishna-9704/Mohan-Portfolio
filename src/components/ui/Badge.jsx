import React from 'react';

export const Badge = ({ children, className = '', color = 'white' }) => {
  const colors = {
    white: 'bg-white text-text-brutal',
    red: 'bg-primary-brutal text-white',
    black: 'bg-secondary-brutal text-white',
    dark: 'bg-secondary-brutal text-white'
  };

  return (
    <span className={`inline-block px-3 py-1 font-mono text-sm font-bold brutal-border-sm brutal-shadow-sm brutal-transition hover:-translate-y-1 hover:-translate-x-1 hover:brutal-shadow ${colors[color] || colors.white} ${className}`}>
      {children}
    </span>
  );
};
