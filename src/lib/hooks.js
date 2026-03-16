import { useState, useEffect } from 'react';

/**
 * Hook that returns true if the user is idle (no mouse move, click, or scroll)
 * for the specified timeout period.
 */
export const useIdle = (timeout = 3000) => {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIsIdle(true), timeout);
    };

    // Initial timer
    timer = setTimeout(() => setIsIdle(true), timeout);

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    return () => {
      clearTimeout(timer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [timeout]);

  return isIdle;
};
