import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../../lib/ThemeContext';
import { useSound } from '../../lib/SoundContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useIdle } from '../../lib/hooks';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { muted, setMuted, play } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isIdle = useIdle(5000);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentIcon = () => {
    switch (theme) {
      case 'light':  return <Sun className="w-4 h-4" />;
      case 'dark':   return <Moon className="w-4 h-4" />;
      case 'system': return <Monitor className="w-4 h-4" />;
      default:       return <Sun className="w-4 h-4" />;
    }
  };

  const THEMES = [
    { id: 'light',  label: 'Light',  icon: Sun },
    { id: 'dark',   label: 'Dark',   icon: Moon },
    { id: 'system', label: 'System', icon: Monitor },
  ];

  return (
    <motion.div 
      animate={{ opacity: isIdle ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-4 right-4 md:top-8 md:right-8 z-[100] flex items-center gap-2 ${isIdle ? 'pointer-events-none' : 'pointer-events-auto'}`} 
      ref={dropdownRef}
    >
      {/* Sound mute toggle */}
      <button
        onClick={() => {
          const next = !muted;
          setMuted(next);
          if (!next) play('theme'); // play a sound when unmuting to confirm
        }}
        className="p-2.5 bg-bg-brutal text-text-brutal brutal-border brutal-shadow brutal-transition hover:brutal-shadow-none hover:text-primary-brutal cursor-pointer"
        title={muted ? 'Enable sounds' : 'Mute sounds'}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Theme dropdown */}
      <div className="relative">
        <button
          onClick={() => { setIsOpen(!isOpen); play('click'); }}
          className="flex items-center gap-2 p-2.5 bg-bg-brutal text-text-brutal brutal-border brutal-shadow brutal-transition hover:brutal-shadow-none cursor-pointer"
          title="Change Theme"
        >
          {getCurrentIcon()}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 w-36 bg-bg-brutal brutal-border brutal-shadow-sm flex flex-col overflow-hidden"
            >
              {THEMES.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    play('theme');
                    setTheme(id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 p-3 font-bold font-mono text-sm brutal-transition text-left
                    ${theme === id ? 'bg-primary-brutal text-white' : 'text-text-brutal hover:bg-text-brutal hover:text-bg-brutal'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
