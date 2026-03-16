import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Award, ChevronDown } from 'lucide-react';
import { Card } from '../ui/Card';

const EduCard = ({ edu, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15, type: "spring" }}
    >
      <Card hover className="cursor-pointer group relative overflow-hidden">
        <div
          className="absolute inset-0 z-10"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        {/* Colored corner banner */}
        <div className={`absolute top-0 left-0 w-2 h-full ${edu.color}`} />

        <div className="pl-5">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${edu.color} brutal-border brutal-shadow-sm group-hover:rotate-12 brutal-transition shrink-0 relative z-20`}>
                {edu.icon}
              </div>
              <div>
                <span className="font-mono font-bold text-xs uppercase text-primary-brutal block">{edu.period}</span>
                <h3 className="text-xl font-black font-display uppercase">{edu.degree}</h3>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="shrink-0 mt-1 text-secondary-brutal relative z-20"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>

          <div className="mb-3">
            <p className="font-bold text-lg">{edu.institution}</p>
            <p className="text-sm text-gray-500 font-mono">{edu.location} • {edu.grade}</p>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="border-t-2 border-dashed border-border-brutal/30 pt-4 mt-2 space-y-4">
                  {edu.highlights && (
                    <div>
                      <h4 className="font-mono font-black text-xs uppercase mb-2 flex items-center gap-2">
                        <BookOpen className="w-3 h-3 text-primary-brutal" />
                        Highlights
                      </h4>
                      <ul className="space-y-2">
                        {edu.highlights.map((h, i) => (
                          <li key={i} className="text-sm font-medium flex items-start gap-2">
                            <span className="text-primary-brutal font-black">→</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {edu.courses && (
                    <div>
                      <h4 className="font-mono font-black text-xs uppercase mb-2 flex items-center gap-2">
                        <Award className="w-3 h-3 text-secondary-brutal" />
                        Key Courses
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map(c => (
                          <span key={c} className="text-xs font-mono font-bold px-2 py-1 bg-secondary-brutal text-white brutal-border">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
};

export const Education = () => {
  const educations = [
    {
      degree: "B.E. in Computer Science",
      institution: "Sri Venkateswara College of Engineering and Technology",
      location: "Chittoor, AP",
      period: "2022 – 2026",
      grade: "CGPA: 7.5",
      color: "bg-primary-brutal",
      icon: <GraduationCap className="w-5 h-5 text-white" />,
      highlights: [
        "Specialization in Data Science and Machine Learning.",
        "Led the college's AI/ML study group for peer learning sessions.",
        "Developed multiple real-world projects in IoT and predictive modeling.",
        "Active participant in hackathons and technical fests."
      ],
      courses: ["Data Structures", "Machine Learning", "DBMS", "Operating Systems", "Deep Learning", "Cloud Computing"]
    },
    {
      degree: "Class XII (Intermediate)",
      institution: "Sri Chaitanya Junior College",
      location: "Andhra Pradesh",
      period: "2020 – 2022",
      grade: "91.2%",
      color: "bg-secondary-brutal",
      icon: <BookOpen className="w-5 h-5 text-white" />,
      highlights: [
        "Maths, Physics, and Chemistry stream.",
        "Scored 91.2% in state board examinations.",
        "Developed foundational analytical and problem-solving skills."
      ],
      courses: ["Mathematics", "Physics", "Chemistry"]
    },
    {
      degree: "Class X (SSC)",
      institution: "ZP High School",
      location: "Andhra Pradesh",
      period: "2019 – 2020",
      grade: "97.5%",
      color: "bg-primary-brutal",
      icon: <Award className="w-5 h-5 text-white" />,
      highlights: [
        "Scored 97.5% in state board SSC examinations.",
        "School topper in Mathematics and Science.",
        "Recipient of the State Merit Scholarship."
      ],
      courses: ["Mathematics", "Science", "Social Studies", "English"]
    }
  ];

  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-5xl md:text-7xl font-black font-display uppercase mb-4 flex items-center gap-4">
          <span className="text-secondary-brutal">*</span>
          Education
        </h2>
        <p className="font-mono font-bold text-sm text-gray-500 mb-12">Click each card to expand academic details.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {educations.map((edu, i) => (
          <EduCard key={i} edu={edu} index={i} />
        ))}
      </div>
    </section>
  );
};
