import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Folder, Briefcase, Mail, Download, Github, Moon, Sun, Home, X } from 'lucide-react';
import { useSound } from '../../lib/SoundContext';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(0);
  const { play } = useSound();
  const inputRef = useRef(null);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const commands = [
    { id: 'home',       label: 'Go to Home',          shortcut: 'H',  icon: <Home className="w-4 h-4" />,     action: () => scrollTo('home') },
    { id: 'projects',   label: 'Go to Projects',       shortcut: 'P',  icon: <Folder className="w-4 h-4" />,   action: () => scrollTo('projects') },
    { id: 'skills',     label: 'View Tech Stack',      shortcut: 'S',  icon: <Terminal className="w-4 h-4" />, action: () => scrollTo('skills') },
    { id: 'experience', label: 'Read Journey',         shortcut: 'J',  icon: <Briefcase className="w-4 h-4" />,action: () => scrollTo('experience') },
    { id: 'contact',    label: 'Contact Me',           shortcut: 'C',  icon: <Mail className="w-4 h-4" />,     action: () => scrollTo('contact') },
    { id: 'github',     label: 'Open GitHub',          shortcut: 'G',  icon: <Github className="w-4 h-4" />,   action: () => window.open('https://github.com/mohankrishna-9704', '_blank') },
    { id: 'resume',     label: 'Download Resume',      shortcut: 'R',  icon: <Download className="w-4 h-4" />, action: () => alert('Resume downloading...') },
    { id: 'theme',      label: 'Toggle Theme',         shortcut: 'T',  icon: <Sun className="w-4 h-4" />,      action: () => document.querySelector('[title="Change Theme"]')?.click() },
    { id: 'terminal',   label: 'Open Terminal',        shortcut: '.',  icon: <Terminal className="w-4 h-4" />, action: () => document.querySelector('[data-terminal-toggle]')?.click() },
  ];

  const filtered = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  const open = () => { setIsOpen(true); setSelected(0); setSearch(''); };
  const close = () => { setIsOpen(false); setSearch(''); };

  useEffect(() => {
    const onKey = (e) => {
      // Open/close
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); isOpen ? close() : open(); return; }
      if (e.key === 'Escape') { close(); return; }

      // Global single-key shortcuts (only when palette is CLOSED and not in an input/textarea)
      if (!isOpen && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        const cmd = commands.find(c => c.shortcut.toLowerCase() === e.key.toLowerCase());
        if (cmd) {
          e.preventDefault();
          play('navigate');
          cmd.action();
          return;
        }
      }

      // Navigate inside palette
      if (isOpen) {
        if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
        if (e.key === 'Enter' && filtered[selected]) {
          play('click');
          filtered[selected].action();
          close();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, filtered, selected]);

  const handleCommand = (action) => {
    play('click');
    action();
    close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-text-brutal/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-xl bg-bg-brutal brutal-border brutal-shadow-hover overflow-hidden flex flex-col"
          >
            {/* Title bar */}
            <div className="bg-border-brutal px-4 py-2 flex items-center justify-between">
              <span className="text-bg-brutal font-mono font-bold text-xs select-none tracking-widest">COMMAND PALETTE — ⌘K</span>
              <button onClick={close} className="text-bg-brutal hover:text-primary-brutal"><X className="w-4 h-4" /></button>
            </div>

            {/* Input */}
            <div className="p-3 border-b-2 border-border-brutal flex items-center gap-3">
              <span className="text-primary-brutal font-black text-xl select-none">{'>'}</span>
              <input
                ref={inputRef}
                autoFocus
                type="text"
                placeholder="Search commands or press a shortcut key…"
                value={search}
                onChange={e => { setSearch(e.target.value); setSelected(0); }}
                className="w-full bg-transparent outline-none font-mono text-base text-text-brutal placeholder:text-gray-400"
              />
            </div>

            {/* Commands */}
            <div className="max-h-[50vh] overflow-y-auto p-1.5 bg-bg-brutal">
              {filtered.length > 0 ? filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  onClick={() => handleCommand(cmd.action)}
                  onMouseEnter={() => setSelected(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 brutal-transition text-left mb-0.5 ${
                    selected === i ? 'bg-text-brutal text-bg-brutal' : 'hover:bg-text-brutal/5'
                  }`}
                >
                  <span className={selected === i ? 'text-primary-brutal' : 'text-gray-400'}>{cmd.icon}</span>
                  <span className="font-bold font-mono text-sm flex-grow">{cmd.label}</span>
                  <kbd className={`text-[10px] font-mono px-1.5 py-0.5 border font-bold ${
                    selected === i ? 'bg-bg-brutal/20 border-bg-brutal/30 text-bg-brutal' : 'bg-gray-100 border-gray-300 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
                  }`}>
                    {cmd.shortcut}
                  </kbd>
                </button>
              )) : (
                <div className="p-6 text-center text-gray-500 font-mono text-sm">
                  No commands matching "{search}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-bg-brutal border-t-2 border-border-brutal p-2 flex justify-between items-center text-[10px] font-mono font-bold text-gray-400">
              <div className="flex gap-3">
                <span><kbd className="bg-gray-100 px-1 border border-gray-300">↑</kbd><kbd className="bg-gray-100 px-1 border border-gray-300 ml-1">↓</kbd> navigate</span>
                <span><kbd className="bg-gray-100 px-1 border border-gray-300">↵</kbd> select</span>
              </div>
              <span>Single-key shortcuts active globally</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
