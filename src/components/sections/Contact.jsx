import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const Contact = () => {
  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-black text-bg-brutal border-b-8 border-border-brutal relative overflow-hidden">

      {/* Decorative large asterisk */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 text-[300px] leading-none opacity-20 text-bg-brutal font-black font-display pointer-events-none"
      >
        *
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black font-display uppercase leading-[0.9] mb-8 text-white drop-shadow-[4px_4px_0_#FF3B30]">
              LET'S BUILD <br /> SOMETHING
            </h2>
            <p className="text-xl md:text-2xl font-bold mb-12 max-w-md border-l-4 border-primary-brutal pl-6 text-gray-400 brutal-shadow-none cursor-pointer">
              Currently open for new opportunities and collaborations. Feel free to reach out.
            </p>

            <a href="mailto:mohankrishna143@gmail.com" className="inline-block group">
              <Button className="text-2xl py-6 px-10 gap-4 group-hover:bg-white group-hover:text-black transition-colors">
                Start a Conversation <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white text-text-brutal p-8 md:p-12 brutal-border shadow-[16px_16px_0px_#000000] rotate-2"
          >
            <h3 className="text-3xl font-black font-display mb-8 pb-4 border-b-4 border-black uppercase">
              Connect
            </h3>

            <div className="space-y-6">
              <a href="mailto:mohankrishna143@gmail.com" className="flex items-center gap-6 group hover:translate-x-2 brutal-transition">
                <div className="p-4 bg-primary-brutal text-white brutal-border group-hover:-rotate-6 brutal-transition">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-gray-500 uppercase text-sm mb-1">Email</p>
                  <p className="text-2xl font-bold font-mono group-hover:text-primary-brutal brutal-transition break-all">mohankrishna@example.com</p>
                </div>
              </a>

              <a href="https://github.com/mohankrishna-9704" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group hover:translate-x-2 brutal-transition">
                <div className="p-4 bg-white text-black brutal-border group-hover:rotate-6 brutal-transition">
                  <Github className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-gray-500 uppercase text-sm mb-1">Github</p>
                  <p className="text-2xl font-bold font-mono group-hover:text-primary-brutal brutal-transition">mohankrishna-9704</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/mohan-krishna-180b40364/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group hover:translate-x-2 brutal-transition">
                <div className="p-4 bg-white text-black brutal-border group-hover:-rotate-6 brutal-transition">
                  <Linkedin className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-gray-500 uppercase text-sm mb-1">LinkedIn</p>
                  <p className="text-2xl font-bold font-mono group-hover:text-primary-brutal brutal-transition break-all">mohan-krishna-180b40364</p>
                </div>
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Footer credits */}
      <div className="absolute bottom-4 left-0 w-full text-center font-mono font-bold text-white border-t-2 border-white/20 pt-4 px-4 bg-primary-brutal">
        © {new Date().getFullYear()} MOHAN KRISHNA. All bold moves reserved.
      </div>
    </section>
  );
};
