import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Brain, Cpu, Database, Atom, Code2 } from 'lucide-react';

const STICKERS = [
  { 
    id: 'python',
    icon: (props) => (
      <svg {...props} viewBox="16 16 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="url(#python_a)" d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454a1.394 1.394 0 1 1 0 2.79 1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"/>
        <path fill="url(#python_b)" d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395 1.394 1.394 0 1 1 1.395 1.395z"/>
        <defs>
          <linearGradient id="python_a" x1="19.075" x2="34.898" y1="18.782" y2="34.658" gradientUnits="userSpaceOnUse"><stop stop-color="#387EB8"/><stop offset="1" stop-color="#366994"/></linearGradient>
          <linearGradient id="python_b" x1="28.809" x2="45.803" y1="28.882" y2="45.163" gradientUnits="userSpaceOnUse"><stop stop-color="#FFE052"/><stop offset="1" stop-color="#FFC331"/></linearGradient>
        </defs>
      </svg>
    ),
    label: 'Python', x: 60, y: 20, rot: -8, color: 'text-[#3776AB]' 
  },
  { id: 'ml', icon: Brain, label: 'ML', x: 72, y: 60, rot: 6, color: 'text-primary-brutal' },
  { id: 'iot', icon: Cpu, label: 'IoT', x: 20, y: 70, rot: -5, color: 'text-secondary-brutal' },
  { id: 'react', icon: Atom, label: 'React', x: 80, y: 35, rot: 10, color: 'text-[#61DAFB]' },
  { id: 'github', icon: Github, label: 'GitHub', x: 30, y: 30, rot: 3, color: 'text-text-brutal' },
  { id: 'sql', icon: Database, label: 'SQL', x: 45, y: 55, rot: -12, color: 'text-green-600' },
];

const Sticker = ({ sticker }) => {
  const Icon = sticker.icon;

  return (
    <motion.div
      drag
      dragMomentum={true}
      dragElastic={0.2}
      whileDrag={{ scale: 1.1, zIndex: 100, cursor: 'grabbing' }}
      whileHover={{ scale: 1.05, rotate: sticker.rot * 1.5 }}
      initial={{ rotate: sticker.rot, x: 0, y: 0 }}
      className="absolute cursor-grab active:cursor-grabbing select-none pointer-events-auto"
      style={{ left: `${sticker.x}%`, top: `${sticker.y}%` }}
    >
      <div className="
        flex items-center gap-2 px-3 py-2 bg-bg-brutal brutal-border brutal-shadow
        hover:brutal-shadow-none brutal-transition group
      ">
        <Icon className={`w-5 h-5 ${sticker.color} brutal-transition group-hover:scale-110`} />
        <span className="font-mono font-black text-xs text-text-brutal uppercase">
          {sticker.label}
        </span>
      </div>
    </motion.div>
  );
};

export const DraggableStickers = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      <div className="relative w-full h-full pointer-events-none">
        {STICKERS.map((s) => (
          <Sticker key={s.id} sticker={s} />
        ))}
        <div className="absolute bottom-4 right-4 font-mono text-[9px] text-gray-400 font-bold opacity-50">
          ← DRAG_STICKERS.exe
        </div>
      </div>
    </div>
  );
};
