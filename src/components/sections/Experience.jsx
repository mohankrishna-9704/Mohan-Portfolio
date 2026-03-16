import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Briefcase, GraduationCap, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { Card } from '../ui/Card';

const ExperienceCard = ({ exp, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`relative mb-16 last:mb-0 w-full sm:w-[calc(50%-40px)] ${index % 2 === 0 ? 'sm:ml-[calc(50%+40px)]' : 'sm:mr-[calc(50%+40px)] sm:ml-0'} pl-16 sm:pl-0 sm:ml-auto`}
    >
      {/* Timeline Line (Mobile) */}
      <div className="absolute top-0 bottom-[-64px] left-[28px] w-[4px] bg-border-brutal z-0 sm:hidden" />
      
      {/* Central Node Indicator */}
      <div className={`absolute top-6 left-[20px] sm:left-auto ${index % 2 === 0 ? 'sm:-left-[52px]' : 'sm:-right-[52px]'} w-5 h-5 rounded-full brutal-border z-10 ${exp.color}`} />

      <Card 
        hover 
        className="relative overflow-visible group cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Decorative Pin */}
        <div className={`absolute -top-4 -right-4 w-8 h-8 rounded-full brutal-border brutal-shadow-sm z-20 flex items-center justify-center ${exp.color} group-hover:rotate-12 brutal-transition`}>
          {exp.icon}
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
               <span className="font-mono font-bold bg-secondary-brutal text-bg-brutal px-2 py-0.5 text-xs inline-block">
                {exp.date}
              </span>
              <div className="text-secondary-brutal">
                 {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>
            <h3 className="text-2xl font-black font-display uppercase">{exp.title}</h3>
            
            <h4 className="text-lg font-bold text-gray-700 flex items-center gap-2 mt-1 mb-2">
               {exp.company} • {exp.type}
            </h4>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-3 font-medium text-base pt-4 mt-4 border-t-2 border-border-brutal/10">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-primary-brutal mt-0.5 font-black leading-none">{'→'}</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Key Courses (for education entries) */}
                  {exp.courses && (
                    <div className="mt-4 pt-3 border-t-2 border-dashed border-border-brutal/20">
                      <p className="font-mono font-black text-xs uppercase mb-2 text-secondary-brutal">Key Courses</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.courses.map(c => (
                          <span key={c} className="text-xs font-mono font-bold px-2 py-1 bg-secondary-brutal text-white brutal-border">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export const Experience = () => {
  const experiences = [
    {
      title: "Bachelor of Engineering in CSE",
      company: "Sri Venkateswara College of Engineering and Technology",
      date: "2022 – 2026",
      type: "Chittoor, AP • CGPA: 7.5",
      icon: <GraduationCap className="w-5 h-5 text-white" />,
      color: "bg-primary-brutal text-white",
      bullets: [
        "Specialization in Data Science and Machine Learning.",
        "Led the college's AI/ML study group for peer learning sessions.",
        "Developed multiple real-world projects in IoT and predictive modeling.",
        "Active participant in hackathons and technical fests."
      ],
      courses: ["Data Structures", "Machine Learning", "DBMS", "Operating Systems", "Deep Learning", "Cloud Computing"]
    },
    {
      title: "Class XII (Intermediate)",
      company: "Sri Chaitanya Junior College",
      date: "2020 – 2022",
      type: "Andhra Pradesh • 91.2%",
      icon: <BookOpen className="w-5 h-5 text-white" />,
      color: "bg-secondary-brutal text-white",
      bullets: [
        "Maths, Physics, and Chemistry stream.",
        "Scored 91.2% in state board examinations.",
        "Developed foundational analytical and problem-solving skills."
      ],
      courses: ["Mathematics", "Physics", "Chemistry"]
    },
    {
      title: "Class X (SSC)",
      company: "ZP High School",
      date: "2019 – 2020",
      type: "Andhra Pradesh • 97.5%",
      icon: <Award className="w-5 h-5 text-white" />,
      color: "bg-primary-brutal text-white",
      bullets: [
        "Scored 97.5% in state board SSC examinations.",
        "School topper in Mathematics and Science.",
        "Recipient of the State Merit Scholarship."
      ],
      courses: ["Mathematics", "Science", "Social Studies", "English"]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-bg-brutal border-y-[6px] border-border-brutal overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-display uppercase inline-block relative">
            <span className="relative z-10">Education & Journey</span>
            <div className="absolute bottom-2 left-[-10px] right-[-10px] h-4 md:h-6 bg-secondary-brutal z-0 -rotate-2" />
          </h2>
          <p className="font-mono font-bold text-sm text-gray-500 mt-6">Click each card to expand details.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main Desktop Vertical Timeline Line */}
          <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 md:transform md:-translate-x-1/2 w-[4px] bg-border-brutal z-0 hidden sm:block" />

          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
