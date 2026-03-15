import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Download } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar = ({ soundEnabled, toggleSound }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 brutal-transition ${scrolled ? 'bg-bg-brutal/90 backdrop-blur-md brutal-border-b' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="font-display font-black text-2xl tracking-tighter hover:text-primary-brutal brutal-transition">
              MOHAN KRISHNA<span className="text-secondary-brutal">.</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="font-bold text-text-brutal hover:text-primary-brutal brutal-transition hover:-translate-y-1 inline-block"
              >
                {link.name}
              </a>
            ))}
            
            <button 
              onClick={toggleSound}
              className="p-2 brutal-border brutal-shadow-sm hover:brutal-shadow hover:-translate-y-1 brutal-transition bg-white rounded-full group outline-none focus:ring-2 focus:ring-primary-brutal"
              aria-label="Toggle Sound"
              title="Toggle ambient background music"
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-text-brutal group-hover:text-primary-brutal" />
              ) : (
                <VolumeX className="w-5 h-5 text-text-brutal group-hover:text-primary-brutal" />
              )}
            </button>
            
            <Button variant="primary" className="gap-2">
              Resume <Download className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleSound}
              className="p-2 brutal-border bg-white rounded-full"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 brutal-border bg-white hover:bg-gray-100 brutal-transition"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden brutal-border-b bg-bg-brutal absolute w-full left-0 top-20 brutal-shadow">
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-4 font-bold text-xl border-b-2 border-transparent hover:border-secondary-brutal brutal-transition"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4">
              <Button variant="primary" className="w-full gap-2 justify-center">
                Download Resume <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
