import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './lib/ThemeContext';
import { SoundProvider } from './lib/SoundContext';
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
import { StatsSection } from './components/sections/StatsSection';
import { SkillsMarquee } from './components/ui/SkillsMarquee';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { NowPlaying } from './components/ui/NowPlaying';
import { SectionReveal } from './components/ui/SectionReveal';
import { useSound } from './lib/SoundContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const AppContent = () => {
  const { soundEnabled, toggleSound } = useSound();
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      <ThemeToggle />
      <CommandPalette />
      <ScrollIndicator />

      <TerminalMode />
      <NowPlaying />

      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="flex justify-center flex-col relative w-full overflow-x-hidden pt-20">
          <BackgroundElements />
          <SideNav />

          {/* Floating Identity Sticker */}
          <div className="fixed top-4 left-4 md:top-8 md:left-8 z-50">
            <a href="#" className="flex items-center gap-3 font-display font-black text-lg md:text-2xl tracking-tighter hover:text-primary-brutal brutal-transition bg-bg-brutal brutal-border brutal-shadow px-3 py-1.5 md:px-4 md:py-2 block">
              <img src="/procedural_logo_circular1_circle.png" alt="MK Logo" className="w-8 h-8 md:w-10 md:h-10 brutal-border-sm" />
              MOHAN KRISHNA<span className="text-primary-brutal">.</span>
            </a>
          </div>

          <main className="w-full relative z-10">
            <Hero />
            <SectionReveal color="bg-secondary-brutal">
              <StatsSection />
            </SectionReveal>
            <SectionReveal color="bg-primary-brutal">
              <Projects />
            </SectionReveal>
            <SkillsMarquee />
            <SectionReveal color="bg-secondary-brutal">
              <Skills />
            </SectionReveal>
            <SectionReveal color="bg-primary-brutal">
              <Experience />
            </SectionReveal>
            <SectionReveal color="bg-text-brutal">
              <Contact />
            </SectionReveal>
          </main>
        </div>
      )}
      <Analytics />
      <SpeedInsights />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <AppContent />
      </SoundProvider>
    </ThemeProvider>
  );
}

export default App;
