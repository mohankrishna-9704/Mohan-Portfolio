import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const AnimatedCounter = ({ value, suffix = '', prefix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on('change', (v) => setDisplay(Math.round(v)));
  }, [springValue]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
};

export const StatsSection = () => {
  const stats = [
    { label: 'Projects Built', value: 5, suffix: '+' },
    { label: 'Technologies', value: 15, suffix: '+' },
    { label: 'Accuracy Achieved', value: 94, suffix: '%' },
    { label: 'Years Coding', value: 3, suffix: '+' },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-y-[6px] border-border-brutal bg-primary-brutal">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`p-8 text-center text-white ${i !== stats.length - 1 ? 'border-r-4 border-white/30' : ''}`}
            >
              <div className="text-5xl md:text-7xl font-black font-display">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p className="font-mono font-bold text-sm mt-2 uppercase tracking-widest text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
