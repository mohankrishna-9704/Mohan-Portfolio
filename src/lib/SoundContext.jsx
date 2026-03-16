import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

const SoundContext = createContext(null);

// Tiny Web Audio API sound generator — no external files needed
function createAudioContext() {
  return new (window.AudioContext || window.webkitAudioContext)();
}

function playTone(ctx, { frequency = 440, type = 'sine', duration = 0.08, gain = 0.08, decay = 0.06 } = {}) {
  try {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.5, ctx.currentTime + duration);
    gainNode.gain.setValueAtTime(gain, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration + decay);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration + decay);
  } catch (_) {}
}

export const SoundProvider = ({ children }) => {
  const [muted, setMuted] = useState(true); // default OFF — user must opt in
  const ctxRef = useRef(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = createAudioContext();
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const play = useCallback((type) => {
    if (muted) return;
    const ctx = getCtx();
    switch (type) {
      case 'click':
        playTone(ctx, { frequency: 900, type: 'square', duration: 0.04, gain: 0.06, decay: 0.03 });
        break;
      case 'expand':
        playTone(ctx, { frequency: 440, type: 'triangle', duration: 0.12, gain: 0.07, decay: 0.08 });
        setTimeout(() => playTone(ctx, { frequency: 660, type: 'triangle', duration: 0.08, gain: 0.05, decay: 0.04 }), 80);
        break;
      case 'collapse':
        playTone(ctx, { frequency: 660, type: 'triangle', duration: 0.08, gain: 0.05, decay: 0.04 });
        setTimeout(() => playTone(ctx, { frequency: 440, type: 'triangle', duration: 0.12, gain: 0.06, decay: 0.06 }), 60);
        break;
      case 'theme':
        playTone(ctx, { frequency: 520, type: 'sine', duration: 0.15, gain: 0.07, decay: 0.1 });
        setTimeout(() => playTone(ctx, { frequency: 780, type: 'sine', duration: 0.1, gain: 0.05, decay: 0.06 }), 100);
        break;
      case 'navigate':
        playTone(ctx, { frequency: 300, type: 'sawtooth', duration: 0.06, gain: 0.04, decay: 0.04 });
        break;
      case 'terminal':
        // Typewriter click
        playTone(ctx, { frequency: 1200, type: 'square', duration: 0.015, gain: 0.05, decay: 0.01 });
        break;
      default:
        playTone(ctx, { frequency: 440, type: 'sine', duration: 0.08, gain: 0.05, decay: 0.04 });
    }
  }, [muted, getCtx]);

  return (
    <SoundContext.Provider value={{ muted, setMuted, play }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const ctx = useContext(SoundContext);
  if (!ctx) return { muted: true, setMuted: () => {}, play: () => {} };
  return ctx;
};
