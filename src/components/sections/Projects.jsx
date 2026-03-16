import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, GitBranch, Star, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useSound } from '../../lib/SoundContext';

const ProjectCard = ({ project, index, isExpanded, onToggle }) => {
  const { play } = useSound();
  const handleToggle = () => { play(isExpanded ? 'collapse' : 'expand'); onToggle(); };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      // Mobile carousel: fixed-width snap item. Desktop: normal grid cell.
      className="snap-start shrink-0 w-[85vw] sm:w-auto"
    >
      <Card hover noPadding className="h-full flex flex-col overflow-hidden group">
        {/* Color banner */}
        <div
          className={`glitch-img h-32 ${project.color} brutal-border-b flex items-center justify-center relative overflow-hidden brutal-transition group-hover:brightness-90 cursor-pointer`}
          onClick={handleToggle}
        >
          <img
            src={`https://picsum.photos/seed/${project.title.replace(/\s+/g, '')}/800/600`}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 brutal-transition scale-110 group-hover:scale-100 mix-blend-overlay"
          />
          <h3 className="text-2xl font-black text-bg-brutal font-display z-10 px-4 text-center drop-shadow-[1.5px_1.5px_0_var(--color-border-brutal)]">
            {project.title}
          </h3>
          {/* Expand hint */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="absolute bottom-2 right-2 w-6 h-6 bg-bg-brutal brutal-border flex items-center justify-center"
          >
            <ChevronDown className="w-3 h-3 text-text-brutal" />
          </motion.div>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-lg font-bold font-display uppercase">{project.title}</h3>
            <div className="flex items-center gap-1 text-[10px] font-mono text-primary-brutal font-bold shrink-0">
              <Star className="w-2.5 h-2.5" />
              {project.status}
            </div>
          </div>

          {/* Expandable details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-2">
                  <p className="mb-4 text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed italic border-l-2 border-primary-brutal pl-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map(t => (
                      <Badge key={t} color="white" className="text-[10px] py-0.5 px-1.5">{t}</Badge>
                    ))}
                  </div>

                  <div className="border-t-[1px] border-border-brutal/10 pt-4 mb-4">
                    <h4 className="font-black font-mono text-[10px] uppercase mb-2 flex items-center gap-2 text-primary-brutal">
                      <GitBranch className="w-3 h-3" />
                      Key Features
                    </h4>
                    <ul className="space-y-1.5">
                      {project.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-[13px] font-medium leading-tight">
                          <span className="text-primary-brutal font-black shrink-0">{'→'}</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {project.impact && (
                      <div className="mt-4 p-2.5 bg-primary-brutal/5 border-l-3 border-primary-brutal">
                        <span className="font-mono font-bold text-[9px] uppercase text-primary-brutal flex items-center gap-1">
                          <Zap className="w-2.5 h-2.5" /> Impact
                        </span>
                        <p className="font-medium text-[12px] mt-1 line-height-tight">{project.impact}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 mt-4">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="dark" className="w-full gap-2 py-1.5 text-xs">
                        <Github className="w-3.5 h-3.5" /> Code
                      </Button>
                    </a>
                    {project.live !== "#" && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant="white" className="w-full gap-2 py-1.5 text-xs">
                          <ExternalLink className="w-3.5 h-3.5" /> Live
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={handleToggle}
            className="mt-2 font-mono font-bold text-[10px] uppercase text-primary-brutal border-t border-border-brutal/10 pt-2 hover:underline brutal-transition flex items-center gap-1 justify-center w-full"
          >
            {isExpanded ? '[-] Compact View' : '[+] Learn More'}
          </button>
        </div>
      </Card>
    </motion.div>
  );
};

export const Projects = () => {
  // Lift expanded state up so only ONE card can be open at a time
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const projects = [
    {
      title: "Fake News Detection",
      description: "A machine learning model designed to classify news articles as real or fake using NLP and classification algorithms.",
      tech: ["Python", "Machine Learning", "NLP", "scikit-learn"],
      github: "https://github.com/mohankrishna-9704",
      live: "#",
      color: "bg-primary-brutal",
      status: "Completed",
      details: [
        "Implemented TF-IDF vectorization for feature extraction from news text.",
        "Evaluated multiple algorithms: Logistic Regression, RandomForest, and SVM.",
        "Achieved 94% accuracy on the test dataset from Kaggle.",
        "Built a CLI demo interface for real-time article classification."
      ],
      impact: "Reduced false news propagation risk in a demo deployment, classifying 1000+ articles accurately."
    },
    {
      title: "Smart Medicine Storage",
      description: "Working on an IoT and ML-based quality monitoring and expiry alerting system for medicine storage to ensure safety and efficiency.",
      tech: ["IoT", "ML", "Python", "Sensors", "Arduino"],
      github: "https://github.com/mohankrishna-9704",
      live: "#",
      color: "bg-secondary-brutal text-white",
      status: "In Progress",
      details: [
        "Integrated DHT11 temperature/humidity sensors to monitor storage conditions.",
        "Built an ML anomaly detection model to flag unsafe storage patterns.",
        "Developed an alerting system that sends real-time notifications on expiry.",
        "Designed a dashboard to visualize sensor data using Python & matplotlib."
      ],
      impact: "Targeting hospitals and pharmacies to prevent medicine degradation and reduce waste by up to 30%."
    }
  ];

  const handleToggle = (index) => {
    setExpandedIndex(prev => prev === index ? null : index);
  };

  const scrollToCard = (idx) => {
    const clamped = Math.max(0, Math.min(idx, projects.length - 1));
    setCurrentIndex(clamped);
    if (scrollRef.current) {
      const cards = scrollRef.current.children;
      if (cards[clamped]) {
        cards[clamped].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      }
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-display uppercase mb-4 flex items-center gap-4">
          <span className="text-primary-brutal">*</span>
          Featured Work
        </h2>
        <p className="font-mono font-bold text-sm text-gray-500 mb-8">Click a project card to expand details.</p>
      </motion.div>

      {/* Desktop: normal grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            isExpanded={expandedIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>

      {/* Mobile: horizontal carousel */}
      <div className="sm:hidden">
        {/* Cards scroll area */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Carousel navigation */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <button
            onClick={() => scrollToCard(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="p-2 brutal-border brutal-shadow-sm disabled:opacity-30 bg-bg-brutal hover:bg-text-brutal hover:text-bg-brutal brutal-transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                className={`w-3 h-3 brutal-border-sm transition-all duration-300 ${
                  currentIndex === i ? 'bg-primary-brutal rotate-45 scale-125' : 'bg-bg-brutal'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollToCard(currentIndex + 1)}
            disabled={currentIndex === projects.length - 1}
            className="p-2 brutal-border brutal-shadow-sm disabled:opacity-30 bg-bg-brutal hover:bg-text-brutal hover:text-bg-brutal brutal-transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
