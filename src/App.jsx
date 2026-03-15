import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Download } from 'lucide-react';
import { Button } from './components/ui/Button';
import { CustomCursor } from './components/layout/CustomCursor';
import { BackgroundElements } from './components/layout/BackgroundElements';
import { LoadingScreen } from './components/sections/LoadingScreen';
import { CommandPalette } from './components/ui/CommandPalette';
import { ScrollIndicator } from './components/layout/ScrollIndicator';
import { SideNav } from './components/layout/SideNav';
import { TerminalMode } from './components/ui/TerminalMode';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';

function App() {
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef(null);

  // Audio setup - using a subtle online ambient sound for demo if none exists locally
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=ambient-piano-amp-strings-10711.mp3'); // Open source ambient track from pixabay
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2;
    }

    if (soundEnabled) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [soundEnabled]);

  return (
    <>
      <CustomCursor />
      <CommandPalette />
      <ScrollIndicator />
      <SideNav />
      <TerminalMode />
      
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="flex justify-center flex-col relative w-full overflow-x-hidden">
          <BackgroundElements />
          
          {/* Floating Identity Sticker */}
          <div className="fixed top-8 left-8 z-50">
            <a href="#" className="font-display font-black text-2xl tracking-tighter hover:text-primary-brutal brutal-transition bg-white brutal-border brutal-shadow px-4 py-2 block">
              MOHAN KRISHNA<span className="text-primary-brutal">.</span>
            </a>
          </div>
          
          <main className="w-full relative z-10">
            <Hero />
            <Projects />
            <Skills />
            <Experience />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}

export default App;
