import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Phone, Copy, Check, Send, ArrowUpRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useSound } from '../../lib/SoundContext';

export const Contact = () => {
  const formRef = useRef();
  const { play } = useSound();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const CONTACT_INFO = [
    {
      label: 'Email',
      value: 'mohankrishna143@gmail.com',
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText('mohankrishna143@gmail.com');
        setCopied(true);
        play('click');
        setTimeout(() => setCopied(false), 2000);
      }
    },
    { label: 'Phone', value: '+91 7780556605', icon: Phone },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    play('click');

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setIsSent(true);
      formRef.current.reset();
      play('theme');
      
      // Reset sent status after 5s
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Failed to send. Check your EmailJS credentials or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-brutal text-text-brutal border-t-8 border-border-brutal relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none select-none">
        <Send className="w-96 h-96 -rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left Side: Copy & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-5xl md:text-7xl font-black font-display uppercase leading-tight mb-8">
              Let's start a <br />
              <span className="text-primary-brutal">conversation</span>
            </h2>
            <p className="text-xl font-bold mb-12 max-w-lg text-text-brutal/70 border-l-4 border-primary-brutal pl-6">
              Have a project in mind? Want to discuss collaboration opportunities? I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>

            <div className="space-y-8">
              {CONTACT_INFO.map((item) => (
                <div key={item.label} className="group flex items-center gap-6">
                  <div className="p-4 bg-bg-brutal brutal-border brutal-shadow group-hover:brutal-shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                    <item.icon className="w-8 h-8 text-primary-brutal" />
                  </div>
                  <div>
                    <p className="font-mono font-black text-xs uppercase text-primary-brutal mb-1 tracking-widest">{item.label}</p>
                    <div className="flex items-center gap-3">
                      <p className="text-xl md:text-2xl font-black font-mono break-all">{item.value}</p>
                      {item.label === 'Email' && (
                        <button onClick={item.action} className="p-2 hover:bg-primary-brutal hover:text-white brutal-transition rounded">
                          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-6 pt-4">
                <div className="p-4 bg-text-brutal text-bg-brutal brutal-border">
                  <span className="font-mono font-black text-xs uppercase">Connect</span>
                </div>
                <div className="flex gap-4">
                  <a href="https://github.com/mohankrishna-9704" target="_blank" rel="noreferrer" className="p-3 bg-bg-brutal brutal-border hover:bg-primary-brutal hover:text-white brutal-transition">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://linkedin.com/in/mohan-krishna-180b40364/" target="_blank" rel="noreferrer" className="p-3 bg-bg-brutal brutal-border hover:bg-primary-brutal hover:text-white brutal-transition">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Technical Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="bg-bg-brutal brutal-border brutal-shadow p-8 md:p-12 relative lg:-rotate-1">
              <h3 className="text-3xl font-black font-display mb-10 pb-4 border-b-4 border-border-brutal uppercase flex justify-between items-center">
                Send Message
                <span className="font-mono text-xs opacity-30">v4.0.2</span>
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
                <div className="relative group">
                  <label className="absolute -top-3 left-4 bg-bg-brutal px-2 font-mono font-black text-[10px] uppercase tracking-widest text-primary-brutal z-10 transition-all group-focus-within:text-text-brutal">
                    [ Name ]
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    required
                    className="w-full bg-transparent border-2 border-border-brutal p-5 pt-7 font-mono text-sm font-bold focus:bg-primary-brutal/5 outline-none brutal-transition"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="relative group">
                  <label className="absolute -top-3 left-4 bg-bg-brutal px-2 font-mono font-black text-[10px] uppercase tracking-widest text-primary-brutal z-10 transition-all group-focus-within:text-text-brutal">
                    [ Email_Address ]
                  </label>
                  <input
                    type="email"
                    name="reply_to"
                    required
                    className="w-full bg-transparent border-2 border-border-brutal p-5 pt-7 font-mono text-sm font-bold focus:bg-primary-brutal/5 outline-none brutal-transition"
                    placeholder="yourname@email.com"
                  />
                </div>

                <div className="relative group">
                  <label className="absolute -top-3 left-4 bg-bg-brutal px-2 font-mono font-black text-[10px] uppercase tracking-widest text-primary-brutal z-10 transition-all group-focus-within:text-text-brutal">
                    [ Data_Payload ]
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    className="w-full bg-transparent border-2 border-border-brutal p-5 pt-7 font-mono text-sm font-bold focus:bg-primary-brutal/5 outline-none brutal-transition resize-none"
                    placeholder="How can I help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-brutal text-white font-black font-display text-xl uppercase py-5 brutal-border brutal-shadow hover:brutal-shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    'PROCESSING...'
                  ) : isSent ? (
                    <>SENT SUCCESSFULLY <Check className="w-6 h-6" /></>
                  ) : (
                    <>SEND MESSAGE <ArrowUpRight className="w-6 h-6" /></>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Footer Credits */}
      <div className="mt-32 pt-8 border-t-4 border-border-brutal text-center font-mono font-black text-xs uppercase tracking-[0.2em] opacity-50">
        © {new Date().getFullYear()} MOHAN KRISHNA // ALL RIGS RESERVED // NEO-BRUTALIST ENGINE v2.5
      </div>
    </section>
  );
};
