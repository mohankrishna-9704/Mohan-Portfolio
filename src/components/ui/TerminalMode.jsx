import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';

export const TerminalMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    { type: 'system', text: 'Welcome to Mohan OS v2.0.0' },
    { type: 'system', text: 'Type "help" to see available commands.' }
  ]);
  const endRef = useRef(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [output, isOpen]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let response = '';

      switch (cmd) {
        case 'help':
          response = 'Available commands: projects, skills, contact, resume, clear, exit';
          break;
        case 'projects':
          response = 'Loading projects...\n- E-Commerce Microservices\n- Predictive Maintenance System\n- Real Estate Platform\n(Type "exit" and scroll to "Featured Work" for visuals)';
          document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'});
          break;
        case 'skills':
          response = '[Backend]: Java, Spring Boot, Node.js\n[AI/ML]: Python, TensorFlow, PyTorch\n[Frontend]: React, Redux, Tailwind CSS';
          document.getElementById('skills')?.scrollIntoView({behavior: 'smooth'});
          break;
        case 'contact':
          response = 'Initializing communication protocols...\nEmail: mohan@example.com\nLinkedIn: /in/mohan-krishna-180b40364\nGitHub: /mohankrishna-9704';
          document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
          break;
        case 'resume':
          response = 'Initiating resume download sequence...';
          break;
        case 'clear':
          setOutput([]);
          setInput('');
          return;
        case 'exit':
          setIsOpen(false);
          setInput('');
          return;
        case '':
          response = '';
          break;
        default:
          response = `Command not found: ${cmd}. Type "help" for a list of commands.`;
      }

      setOutput(prev => [
        ...prev, 
        { type: 'input', text: `> ${cmd}` },
        ...(response ? [{ type: 'output', text: response }] : [])
      ]);
      setInput('');
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsOpen(true)}
          data-terminal-toggle
          className="fixed bottom-32 left-4 md:bottom-8 md:left-8 z-50 p-3 md:p-4 bg-bg-brutal text-text-brutal brutal-border brutal-shadow-sm hover:-translate-y-1 hover:brutal-shadow-hover hover:bg-text-brutal hover:text-bg-brutal brutal-transition flex items-center gap-2"
        >
          <TerminalIcon className="w-5 h-5" />
          <span className="font-mono font-bold hidden sm:inline">Terminal</span>
        </motion.button>
      )}

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragMomentum={false}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            className={`fixed z-[100] ${isMaximized ? 'inset-2 md:inset-4 inline-block' : 'bottom-4 left-4 md:bottom-24 md:left-8 w-[calc(100vw-32px)] md:w-[500px] h-[250px] md:h-[400px]'} bg-bg-brutal text-text-brutal brutal-border brutal-shadow flex flex-col pointer-events-auto`}
          >
            {/* Window Header - Drag Handle */}
            <div className="bg-text-brutal px-4 py-2 flex justify-between items-center border-b-4 border-black cursor-move select-none">
              <div className="flex items-center gap-3 text-bg-brutal">
                <TerminalIcon className="w-4 h-4" />
                <span className="font-mono text-sm font-bold truncate">mohan@portfolio: ~</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMaximized(!isMaximized)} className="text-bg-brutal hover:text-primary-brutal p-1">
                  {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-bg-brutal hover:text-primary-brutal p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-grow p-3 overflow-y-auto font-mono text-xs md:text-sm space-y-1.5 text-text-brutal">
              {output.map((line, i) => (
                <div key={i} className={`${line.type === 'input' ? 'text-text-brutal font-bold' : line.type === 'system' ? 'text-primary-brutal font-bold' : 'text-text-brutal/80'} whitespace-pre-wrap`}>
                  {line.text}
                </div>
              ))}
              <div className="flex items-center gap-2 text-text-brutal pb-2">
                <span>{`>`}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  autoFocus
                  className="bg-transparent outline-none flex-grow text-text-brutal caret-primary-brutal"
                  spellCheck="false"
                />
              </div>
              <div ref={endRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
