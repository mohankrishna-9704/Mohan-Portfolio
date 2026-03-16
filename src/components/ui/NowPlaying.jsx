import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const TRACKS = [
  { title: 'Weightless', artist: 'Marconi Union', mood: 'Focus', link: 'https://www.youtube.com/watch?v=UfcAVejslrU' },
  { title: 'Lo-Fi Hip Hop Radio', artist: 'Lofi Girl', mood: 'Chill', link: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' },
  { title: 'Comptine d\'un autre été', artist: 'Yann Tiersen', mood: 'Deep Work', link: 'https://www.youtube.com/watch?v=MlBYbSTwKH8' },
  { title: 'Experience', artist: 'Ludovico Einaudi', mood: 'Flow', link: 'https://www.youtube.com/watch?v=hN_q-_nGv4U' },
  { title: 'Time', artist: 'Hans Zimmer', mood: 'Epic', link: 'https://www.youtube.com/watch?v=RxabLA7UQ9k' },
];

// Animated bars for the visualizer
const Bar = ({ delay }) => (
  <motion.span
    className="inline-block w-[3px] rounded-full bg-primary-brutal"
    animate={{ scaleY: [0.3, 1, 0.5, 0.9, 0.3] }}
    transition={{ duration: 1.2, repeat: Infinity, delay, ease: 'easeInOut' }}
    style={{ height: 14, transformOrigin: 'bottom' }}
  />
);

export const NowPlaying = () => {
  const [expanded, setExpanded] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  // Cycle tracks every 25s for fun
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setTrackIndex(i => (i + 1) % TRACKS.length);
    }, 25000);
    return () => clearInterval(id);
  }, [playing]);

  const track = TRACKS[trackIndex];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.5, type: 'spring' }}
      className="fixed bottom-10 left-4 md:bottom-8 md:left-auto md:right-32 z-50 select-none"
    >
      <div className="bg-bg-brutal brutal-border brutal-shadow overflow-hidden w-56">
        {/* Header row */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-primary-brutal/5 brutal-transition"
        >
          <div className="flex items-end gap-[3px] h-4">
            {playing ? (
              <>
                <Bar delay={0} />
                <Bar delay={0.2} />
                <Bar delay={0.1} />
                <Bar delay={0.3} />
              </>
            ) : (
              <Music className="w-4 h-4 text-primary-brutal" />
            )}
          </div>
          <div className="flex-1 text-left overflow-hidden">
            <p className="font-mono font-bold text-[10px] uppercase text-primary-brutal truncate">
              {playing ? '♪ Now Listening' : '■ Paused'}
            </p>
            <p className="font-bold text-xs truncate">{track.title}</p>
          </div>
          {expanded ? <ChevronDown className="w-3.5 h-3.5 shrink-0" /> : <ChevronUp className="w-3.5 h-3.5 shrink-0" />}
        </button>

        {/* Expanded track list */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t-2 border-border-brutal"
            >
              <div className="px-2 pt-1 pb-2">
                <p className="font-mono font-bold text-[9px] uppercase text-gray-400 px-1 py-1">Coding Playlist</p>
                {TRACKS.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => { setTrackIndex(i); setPlaying(true); }}
                    className={`w-full text-left px-2 py-1.5 rounded flex items-center gap-2 brutal-transition ${
                      i === trackIndex ? 'bg-primary-brutal text-white' : 'hover:bg-primary-brutal/10'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[11px] truncate">{t.title}</p>
                      <p className={`font-mono text-[9px] truncate ${i === trackIndex ? 'text-white/70' : 'text-gray-500'}`}>{t.artist}</p>
                    </div>
                    <span className={`font-mono text-[8px] px-1 ${i === trackIndex ? 'bg-white/20 text-white' : 'bg-primary-brutal/10 text-primary-brutal'}`}>
                      {t.mood}
                    </span>
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className={`shrink-0 ${i === trackIndex ? 'text-white/70' : 'text-gray-400'} hover:text-primary-brutal`}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </button>
                ))}
                {/* Controls */}
                <div className="flex justify-center gap-3 mt-2 pt-2 border-t border-border-brutal/20">
                  <button
                    onClick={() => setTrackIndex(i => (i - 1 + TRACKS.length) % TRACKS.length)}
                    className="font-mono font-black text-sm text-text-brutal hover:text-primary-brutal brutal-transition px-2"
                  >⏮</button>
                  <button
                    onClick={() => setPlaying(p => !p)}
                    className="font-mono font-black text-sm bg-primary-brutal text-white w-7 h-7 flex items-center justify-center brutal-border brutal-transition hover:opacity-80"
                  >{playing ? '⏸' : '▶'}</button>
                  <button
                    onClick={() => setTrackIndex(i => (i + 1) % TRACKS.length)}
                    className="font-mono font-black text-sm text-text-brutal hover:text-primary-brutal brutal-transition px-2"
                  >⏭</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
