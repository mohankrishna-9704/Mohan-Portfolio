import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [magnetTarget, setMagnetTarget] = useState(null);
  const animFrame = useRef(null);
  const isTouch = useRef(window.matchMedia('(pointer: coarse)').matches);

  useEffect(() => {
    if (isTouch.current) return;

    const lerp = (a, b, t) => a + (b - a) * t;

    const animateCursor = () => {
      if (magnetTarget) {
        const rect = magnetTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Pull cursor slightly toward center of magnetic element
        const mx = mouse.x + (cx - mouse.x) * 0.3;
        const my = mouse.y + (cy - mouse.y) * 0.3;
        setCursor(prev => ({
          x: lerp(prev.x, mx, 0.18),
          y: lerp(prev.y, my, 0.18),
        }));
      } else {
        setCursor(prev => ({
          x: lerp(prev.x, mouse.x, 0.18),
          y: lerp(prev.y, mouse.y, 0.18),
        }));
      }
      animFrame.current = requestAnimationFrame(animateCursor);
    };
    animFrame.current = requestAnimationFrame(animateCursor);
    return () => cancelAnimationFrame(animFrame.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouse, magnetTarget]);

  useEffect(() => {
    if (isTouch.current) return;

    const onMove = (e) => {
      // Update raw mouse position using ref-cached closure
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setMouse({ x: e.clientX, y: e.clientY });

      // Magnetic activation: find nearest button/a within 80px
      const els = document.querySelectorAll('button, a, [data-magnetic]');
      let closest = null;
      let minDist = 80;
      els.forEach(el => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
        if (dist < minDist) { minDist = dist; closest = el; }
      });
      setMagnetTarget(closest);
    };

    const onOver = (e) => {
      const t = e.target;
      const isLink = t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('a') || t.closest('button');
      const isInput = t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'P' || t.tagName === 'SPAN' || t.tagName === 'H1' || t.tagName === 'H2' || t.tagName === 'H3';
      setIsHovering(!!isLink);
      setIsText(!isLink && !!isInput);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const mouseRef = useRef({ x: 0, y: 0 });

  if (isTouch.current) return null;

  const size = isClicking ? 12 : isHovering ? 48 : isText ? 4 : 20;
  const borderRadius = isText ? '2px' : '50%';

  return (
    <>
      {/* Glow blob */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[89] blur-3xl"
        style={{ width: 160, height: 160, borderRadius: '50%', background: 'var(--color-primary-brutal)', opacity: 0.18 }}
        animate={{ x: cursor.x - 80, y: cursor.y - 80, scale: isHovering ? 1.4 : 1 }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />

      {/* Lagging ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] border-2 border-primary-brutal mix-blend-difference"
        style={{
          width: size,
          height: size,
          borderRadius,
          background: isHovering ? 'var(--color-primary-brutal)' : 'transparent',
          borderWidth: isHovering ? 0 : 2,
          mixBlendMode: 'difference',
        }}
        animate={{
          x: cursor.x - size / 2,
          y: cursor.y - size / 2,
          width: size,
          height: size,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />

      {/* Instant dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[101] bg-text-brutal"
        style={{ width: 5, height: 5, borderRadius: '50%' }}
        animate={{ x: mouse.x - 2.5, y: mouse.y - 2.5 }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
    </>
  );
};
