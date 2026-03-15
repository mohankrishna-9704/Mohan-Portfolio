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
          className="fixed bottom-8 left-8 z-50 p-4 bg-bg-brutal text-text-brutal brutal-border brutal-shadow-sm hover:-translate-y-1 hover:brutal-shadow-hover hover:bg-black hover:text-white brutal-transition hidden md:flex items-center gap-2"
        >
          <TerminalIcon className="w-5 h-5" />
          <span className="font-mono font-bold">Terminal</span>
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
            className={`fixed z-[100] ${isMaximized ? 'inset-4 inline-block' : 'bottom-24 left-8 w-[500px] h-[400px]'} bg-black brutal-border brutal-shadow flex flex-col pointer-events-auto`}
          >
            {/* Window Header - Drag Handle */}
            <div className="bg-text-brutal px-4 py-2 flex justify-between items-center border-b-4 border-black cursor-move select-none">
              <div className="flex items-center gap-3 text-bg-brutal">
                <TerminalIcon className="w-4 h-4" />
                <span className="font-mono text-sm font-bold">mohan@portfolio: ~</span>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setIsMaximized(!isMaximized)} className="text-bg-brutal hover:text-primary-brutal">
                  {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-bg-brutal hover:text-primary-brutal">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-grow p-4 overflow-y-auto font-mono text-sm space-y-2 text-white">
              {output.map((line, i) => (
                <div key={i} className={`${line.type === 'input' ? 'text-white' : line.type === 'system' ? 'text-primary-brutal' : 'text-tertiary-brutal'} whitespace-pre-wrap`}>
                  {line.text}
                </div>
              ))}
              <div className="flex items-center gap-2 text-white">
                <span>{`>`}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  autoFocus
                  className="bg-transparent outline-none flex-grow text-white caret-primary-brutal"
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
