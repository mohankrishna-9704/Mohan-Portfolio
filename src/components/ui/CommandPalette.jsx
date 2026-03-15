import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Folder, Briefcase, Mail, Download, X } from 'lucide-react';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { id: 'projects', label: 'Go to Projects', icon: <Folder className="w-5 h-5" />, action: () => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'}) },
    { id: 'skills', label: 'View Tech Stack', icon: <Terminal className="w-5 h-5" />, action: () => document.getElementById('skills')?.scrollIntoView({behavior: 'smooth'}) },
    { id: 'experience', label: 'Read Experience', icon: <Briefcase className="w-5 h-5" />, action: () => document.getElementById('experience')?.scrollIntoView({behavior: 'smooth'}) },
    { id: 'contact', label: 'Contact Me', icon: <Mail className="w-5 h-5" />, action: () => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}) },
    { id: 'resume', label: 'Open Resume', icon: <Download className="w-5 h-5" />, action: () => alert('Resume downloading...') },
    { id: 'github', label: 'View GitHub', icon: <Terminal className="w-5 h-5" />, action: () => window.open('https://github.com/mohankrishna-9704', '_blank') },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleCommand = (action) => {
    action();
    setIsOpen(false);
    setSearch('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-text-brutal/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl bg-bg-brutal brutal-border brutal-shadow-hover overflow-hidden flex flex-col"
          >
            <div className="bg-border-brutal px-4 py-2 flex items-center justify-between">
              <span className="text-bg-brutal font-mono font-bold text-sm select-none">DEVELOPER COMMAND PALETTE</span>
              <button onClick={() => setIsOpen(false)} className="text-bg-brutal hover:text-primary-brutal">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 border-b-4 border-border-brutal bg-white flex items-center gap-3">
              <span className="text-primary-brutal font-black text-xl">{'>'}</span>
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none font-mono text-lg text-text-brutal placeholder:text-gray-400"
              />
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto p-2 bg-bg-brutal">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => handleCommand(cmd.action)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-black hover:text-white brutal-transition text-left group border-2 border-transparent hover:border-black mb-1"
                  >
                    <span className="text-gray-500 group-hover:text-primary-brutal">{cmd.icon}</span>
                    <span className="font-bold font-mono text-lg flex-grow">{cmd.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 font-mono text-sm text-gray-400">↵</span>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500 font-mono">
                  No commands found matching "{search}"
                </div>
              )}
            </div>
            
            <div className="bg-white border-t-4 border-border-brutal p-3 flex justify-between items-center text-xs font-mono font-bold text-gray-400">
              <div className="flex gap-4">
                <span>Use <kbd className="bg-gray-100 px-1 border border-gray-300 rounded">↑</kbd> <kbd className="bg-gray-100 px-1 border border-gray-300 rounded">↓</kbd> to navigate</span>
                <span><kbd className="bg-gray-100 px-1 border border-gray-300 rounded">↵</kbd> to select</span>
              </div>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
