import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export const Skills = () => {
  const categories = [
    {
      title: "Core Languages",
      skills: ["Python", "C++", "SQL"],
      color: "bg-primary-brutal"
    },
    {
      title: "Data Science & ML",
      skills: ["Machine Learning", "NLP", "Pandas", "NumPy", "scikit-learn", "Data Analysis"],
      color: "bg-secondary-brutal"
    },
    {
      title: "Interests & Focus",
      skills: ["Tech Developing", "IoT Systems", "Research", "Predictive Modeling"],
      color: "bg-primary-brutal"
    },
    {
      title: "Tools & Other",
      skills: ["Git", "GitHub", "Jupyter Notebooks", "Sensors", "VS Code"],
      color: "bg-secondary-brutal"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="sticky top-32"
          >
            <h2 className="text-5xl md:text-7xl font-black font-display uppercase mb-6 leading-none">
              <span className="text-secondary-brutal block mb-2">*</span>
              Tech <br /> Arsenal
            </h2>
            <p className="text-xl font-bold max-w-sm mb-8">
              A robust mix of enterprise backend tech, modern frontend tools, and AI/ML frameworks.
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full border-t-[8px]">
                  <div className={`h-2 w-full absolute top-0 left-0 ${category.color} brutal-border-b`} />
                  <h3 className="text-2xl font-black font-display mb-6 pt-2 select-none uppercase">{category.title}</h3>
                  
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-3"
                  >
                    {category.skills.map(skill => (
                      <motion.div 
                        key={skill} 
                        variants={itemVariants}
                        whileHover={{ rotate: Math.random() > 0.5 ? 3 : -3, scale: 1.05 }}
                        className="cursor-pointer brutal-transition"
                      >
                        <Badge className="text-base py-2 px-4 shadow-none hover:brutal-shadow-sm flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-border-brutal" />
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
