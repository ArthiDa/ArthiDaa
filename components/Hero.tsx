import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BIO } from '../constants';
import { ArrowRight, Terminal } from 'lucide-react';
import { Section } from '../types';

interface HeroProps {
  setSection: (s: Section) => void;
}

// Typewriter component with loop
const Typewriter: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const startDelay = setTimeout(() => {
      if (isTyping) {
        // Typing phase
        if (displayedText.length < text.length) {
          timeout = setTimeout(() => {
            setDisplayedText(text.slice(0, displayedText.length + 1));
          }, 50); // Faster typing speed
        } else {
          // Finished typing, wait then start erasing
          timeout = setTimeout(() => {
            setIsTyping(false);
          }, 2000); // Pause before erasing
        }
      } else {
        // Erasing phase
        if (displayedText.length > 0) {
          timeout = setTimeout(() => {
            setDisplayedText(displayedText.slice(0, -1));
          }, 30); // Faster erasing speed
        } else {
          // Finished erasing, wait then start typing again
          timeout = setTimeout(() => {
            setIsTyping(true);
          }, 500); // Pause before retyping
        }
      }
    }, displayedText.length === 0 && isTyping ? delay : 0);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeout);
    };
  }, [displayedText, isTyping, text, delay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayedText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
    </span>
  );
};

const Hero: React.FC<HeroProps> = ({ setSection }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background Grid Effect */}
      <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] opacity-10 pointer-events-none">
        {Array.from({ length: 400 }).map((_, i) => (
          <motion.div
            key={i}
            className="border border-neon-blue/20 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.001, duration: 0.5 }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div
        className="z-10 text-center space-y-8 p-6 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="inline-block border border-neon-green px-4 py-1 rounded-full bg-neon-green/10 mb-4 animate-glow-pulse"
        >
          <span className="text-neon-green font-gaming text-xs">SYSTEM ONLINE</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold font-tech uppercase tracking-widest text-white"
          variants={itemVariants}
          style={{ textShadow: '0 0 10px rgba(0,243,255,0.5)' }}
          whileHover={{ scale: 1.02 }}
        >
          <span
            className="glitch"
            data-text={BIO.name}
          >
            {BIO.name}
          </span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 text-xl md:text-2xl text-neon-blue font-gaming"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Terminal size={24} />
          </motion.div>
          <span>
            <Typewriter text={BIO.role} delay={1000} />
          </span>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed border-l-4 border-neon-purple pl-6 text-left bg-black/40 p-4 rounded-r-lg animate-border-glow"
        >
          {BIO.intro}
        </motion.p>

        <motion.button
          variants={itemVariants}
          onClick={() => setSection(Section.JOURNEY)}
          className="group relative px-8 py-4 bg-transparent border-2 border-neon-blue text-neon-blue font-gaming uppercase text-sm hover:bg-neon-blue hover:text-black transition-all duration-300 mt-8 overflow-hidden"
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,243,255,0.6)' }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 w-full h-full bg-neon-blue/20 blur"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
          <span className="relative z-10">
            Start Journey <ArrowRight className="inline ml-2 group-hover:translate-x-2 transition-transform" />
          </span>
        </motion.button>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />

      {/* Corner Accents */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-neon-blue/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-neon-blue/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-32 left-10 w-20 h-20 border-l-2 border-b-2 border-neon-purple/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-32 right-10 w-20 h-20 border-r-2 border-b-2 border-neon-purple/50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      />
    </div>
  );
};

export default Hero;
