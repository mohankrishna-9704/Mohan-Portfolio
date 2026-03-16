import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, ChevronDown, ChevronUp, ExternalLink, Play, Pause, SkipBack, SkipForward, Hourglass, RotateCcw } from 'lucide-react';
import { useIdle } from '../../lib/hooks';

// Recommended tracks
const RECOMMENDED_TRACKS = [
  { 
    title: 'Am I Dreaming',
    artist: 'Metro Boomin ft. A$AP Rocky',
    mood: 'Epic',
    ytId: '2xomWWncop0',
  },
  { 
    title: 'Cornfield Chase',
    artist: 'Hans Zimmer',
    mood: 'Space',
    ytId: '7GlsxNI4LVI',
  },
  { 
    title: 'Starboy',
    artist: 'The Weeknd ft. Daft Punk',
    mood: 'Hype',
    ytId: '34Na4j8AVgA',
  },
  { 
    title: 'The Night We Met',
    artist: 'Lord Huron',
    mood: 'Vibe',
    ytId: 'KtlgYxa6BMU',
  },
];

// Discovery pool for infinite playback
const DISCOVERY_POOL = [
  { title: 'Time', artist: 'Hans Zimmer', ytId: 'RxabLA7UQ9k', mood: 'Dream' },
  { title: 'After Hours', artist: 'The Weeknd', ytId: 'ygTZZpVNJN4', mood: 'Late' },
  { title: 'Runaway', artist: 'Kanye West', ytId: 'Bm5iA4Zupek', mood: 'Art' },
  { title: 'Midnight City', artist: 'M83', ytId: 'dX3k_L5697M', mood: 'Retro' },
  { title: 'Blinding Lights', artist: 'The Weeknd', ytId: '4NRXx6U8ABQ', mood: 'Speed' },
  { title: 'Intro', artist: 'The XX', ytId: '3xZ66S331M4', mood: 'Focus' },
  { title: 'Daylight', artist: 'David Kushner', ytId: 'MoN9ql6YqhA', mood: 'Soul' },
  { title: 'Way Down We Go', artist: 'KALEO', ytId: '0-7IHOXkiV8', mood: 'Dark' },
  { title: 'Nightcall', artist: 'Kavinsky', ytId: 'MV_3Dpw-BRY', mood: 'Neon' },
  { title: 'Lovely', artist: 'Billie Eilish ft. Khalid', ytId: 'V1Pl8CzNzCw', mood: 'Sad' },
];

export const NowPlaying = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentTracks, setCurrentTracks] = useState(RECOMMENDED_TRACKS);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const playerRef = useRef(null);
  const playerInstanceRef = useRef(null);
  const progressInterval = useRef(null);
  const isIdle = useIdle(5000);

  // Load the YouTube IFrame API script once
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setPlayerReady(true);
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => setPlayerReady(true);
  }, []);

  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  useEffect(() => {
    if (!playerReady || !playerRef.current || playerInstanceRef.current) return;

    playerInstanceRef.current = new window.YT.Player(playerRef.current, {
      videoId: RECOMMENDED_TRACKS[0].ytId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onStateChange: (event) => {
          if (event.data === 1) { // PLAYING
            setIsPlaying(true);
            setIsBuffering(false);
            setDuration(playerInstanceRef.current.getDuration());
            startProgressTimer();
          } else if (event.data === 2) { // PAUSED
            setIsPlaying(false);
            setIsBuffering(false);
            stopProgressTimer();
          } else if (event.data === 0) { // ENDED
            setIsPlaying(false);
            handleNext();
          } else if (event.data === 3) { // BUFFERING
            setIsBuffering(true);
          }
        },
      },
    });

    return () => stopProgressTimer();
  }, [playerReady]);

  const startProgressTimer = () => {
    stopProgressTimer();
    progressInterval.current = setInterval(() => {
      if (playerInstanceRef.current && playerInstanceRef.current.getCurrentTime) {
        const cur = playerInstanceRef.current.getCurrentTime();
        const dur = playerInstanceRef.current.getDuration();
        setCurrentTime(cur);
        setDuration(dur);
        setProgress((cur / dur) * 100);
      }
    }, 1000);
  };

  const stopProgressTimer = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
  };

  const handlePlayPause = () => {
    if (!playerInstanceRef.current || !playerInstanceRef.current.playVideo) return;
    if (isPlaying) {
      playerInstanceRef.current.pauseVideo();
    } else {
      setIsBuffering(true);
      playerInstanceRef.current.playVideo();
    }
  };

  const handleTrackChange = (index, list = RECOMMENDED_TRACKS) => {
    setCurrentTracks(list);
    setTrackIndex(index);
    if (!playerInstanceRef.current || !playerInstanceRef.current.loadVideoById) return;
    
    setIsPlaying(false);
    setIsBuffering(true);
    setProgress(0);
    playerInstanceRef.current.loadVideoById(list[index].ytId);
  };

  const handleNext = () => {
    let nextIndex = trackIndex + 1;
    let nextList = currentTracks;

    // Switch to discovery pool if recommended ends
    if (nextIndex >= currentTracks.length) {
      nextList = DISCOVERY_POOL;
      nextIndex = Math.floor(Math.random() * DISCOVERY_POOL.length);
    }
    
    handleTrackChange(nextIndex, nextList);
  };

  const handlePrev = () => {
    if (currentTime > 3) {
      handleReplay();
      return;
    }
    let prevIndex = trackIndex - 1;
    if (prevIndex < 0) prevIndex = currentTracks.length - 1;
    handleTrackChange(prevIndex, currentTracks);
  };

  const handleReplay = () => {
    if (playerInstanceRef.current && playerInstanceRef.current.seekTo) {
      playerInstanceRef.current.seekTo(0);
      playerInstanceRef.current.playVideo();
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    const newTime = duration * pct;
    if (playerInstanceRef.current && playerInstanceRef.current.seekTo) {
      playerInstanceRef.current.seekTo(newTime);
      setProgress(pct * 100);
    }
  };

  const track = currentTracks[trackIndex];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: isIdle ? 0 : 1, x: 0 }}
      transition={{ delay: isIdle ? 0 : 2.5, duration: 0.5 }}
      style={{ pointerEvents: isIdle ? 'none' : 'auto' }}
      className="fixed bottom-12 left-4 md:bottom-8 md:right-32 md:left-auto z-[55] select-none"
    >
      <div className={`bg-bg-brutal brutal-border brutal-shadow overflow-hidden brutal-transition ${expanded ? 'w-64' : 'w-auto md:w-64'}`}>
        
        {/* Progress Bar (Hidden on mobile collapsed) */}
        <div 
          className={`h-1 bg-gray-200 cursor-pointer group relative overflow-hidden ${!expanded && 'hidden md:block'}`} 
          onClick={handleSeek}
        >
          <motion.div 
            className="h-full bg-primary-brutal"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="overflow-hidden" style={{ height: 0, width: 0, position: 'absolute' }}>
          <div ref={playerRef} />
        </div>

        {/* Header / Icon Trigger */}
        <button
          onClick={() => setExpanded(e => !e)}
          className={`flex items-center brutal-transition ${
            expanded 
              ? 'w-full gap-2 px-3 py-2 hover:bg-primary-brutal/10' 
              : 'p-3 md:w-full md:gap-2 md:px-3 md:py-2 hover:bg-primary-brutal/10'
          }`}
        >
          <div className="flex items-end gap-[3px] h-4">
            {isBuffering ? (
              <Hourglass className="w-4 h-4 text-primary-brutal animate-spin" />
            ) : isPlaying ? (
              <div className="flex items-end gap-[2px]">
                {[0, 0.2, 0.1, 0.3].map((delay, i) => (
                  <motion.span
                    key={i}
                    className="w-[2.5px] bg-primary-brutal"
                    animate={{ scaleY: [0.3, 1, 0.5, 0.9, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay, ease: 'easeInOut' }}
                    style={{ height: 12, transformOrigin: 'bottom' }}
                  />
                ))}
              </div>
            ) : (
              <Music className="w-4 h-4 text-primary-brutal" />
            )}
          </div>
          
          <div className={`flex-1 text-left overflow-hidden ${!expanded && 'hidden md:block'}`}>
            <p className="font-mono font-bold text-[9px] uppercase text-primary-brutal truncate">
              {isBuffering ? '⧗ Buffering...' : isPlaying ? '♪ Now Listening' : '■ Paused'}
            </p>
            <p className="font-bold text-xs truncate">{track.title}</p>
          </div>

          <div className={`items-center gap-1 shrink-0 ${!expanded ? 'hidden md:flex' : 'flex'}`}>
            <span className="font-mono text-[8px] md:text-[9px] text-gray-500">
              {formatTime(currentTime)}
            </span>
            {expanded ? <ChevronUp className="w-3 h-3 md:w-3.5 md:h-3.5" /> : <ChevronDown className="w-3 h-3 md:w-3.5 md:h-3.5" />}
          </div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden border-t-2 border-border-brutal"
            >
              <div className="px-2 pb-2 pt-1">
                <div className="flex items-center justify-between px-1 py-1">
                  <p className="font-mono font-bold text-[9px] uppercase text-gray-400">
                    {currentTracks === RECOMMENDED_TRACKS ? 'RECOMMENDED' : 'DISCOVERY MODE'}
                  </p>
                  <button 
                    onClick={handleReplay}
                    className="p-1 hover:text-primary-brutal brutal-transition"
                    title="Replay"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="max-h-48 overflow-y-auto custom-scrollbar">
                  {RECOMMENDED_TRACKS.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => handleTrackChange(i, RECOMMENDED_TRACKS)}
                      className={`w-full text-left px-2 py-1.5 rounded flex items-center gap-2 brutal-transition group ${
                        currentTracks === RECOMMENDED_TRACKS && i === trackIndex ? 'bg-primary-brutal text-white' : 'hover:bg-primary-brutal/10'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[11px] truncate">{t.title}</p>
                        <p className={`font-mono text-[8px] truncate ${currentTracks === RECOMMENDED_TRACKS && i === trackIndex ? 'text-white/70' : 'text-gray-500'}`}>
                          {t.artist}
                        </p>
                      </div>
                      <span className={`font-mono text-[8px] px-1 shrink-0 ${currentTracks === RECOMMENDED_TRACKS && i === trackIndex ? 'bg-white/20 text-white' : 'bg-primary-brutal/10 text-primary-brutal group-hover:bg-primary-brutal group-hover:text-white'}`}>
                        {t.mood}
                      </span>
                    </button>
                  ))}
                  
                  {currentTracks === DISCOVERY_POOL && (
                    <div className="mt-2 p-2 bg-primary-brutal/5 border-t border-dashed border-primary-brutal/20">
                      <p className="font-bold text-[11px] text-primary-brutal truncate">✧ {track.title}</p>
                      <p className="font-mono text-[8px] text-gray-500 italic">Discovery: Infinite Flow</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-center gap-4 mt-3 pt-2 border-t border-border-brutal/20">
                  <button onClick={handlePrev} className="text-text-brutal hover:text-primary-brutal brutal-transition p-1">
                    <SkipBack className="w-4.5 h-4.5" />
                  </button>
                  <button
                    onClick={handlePlayPause}
                    className="bg-primary-brutal text-white w-9 h-9 flex items-center justify-center brutal-border brutal-transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_#000]"
                  >
                    {isBuffering ? <Hourglass className="w-4 h-4 animate-spin" /> : isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <button onClick={handleNext} className="text-text-brutal hover:text-primary-brutal brutal-transition p-1">
                    <SkipForward className="w-4.5 h-4.5" />
                  </button>
                </div>

                <div className="flex justify-between items-center mt-2 px-1 text-[8px] font-mono text-gray-400">
                  <span>YOUTUBE PLAYER</span>
                  <span>{formatTime(currentTime)} | {formatTime(duration)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
