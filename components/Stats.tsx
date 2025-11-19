import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { SKILLS } from '../constants';
import { Cpu } from 'lucide-react';

const AnimatedCounter: React.FC<{ target: number; delay: number }> = ({ target, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, delay]);

  return <span>{count}</span>;
};

const Stats: React.FC = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-4xl mx-auto">
      <motion.h2
        className="text-4xl font-gaming text-center mb-12 text-neon-green drop-shadow-[0_0_5px_rgba(10,255,10,0.8)]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Player Stats
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-card-bg p-6 rounded-xl border border-gray-800 relative overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ boxShadow: '0 0 30px rgba(0,243,255,0.2)' }}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <motion.h3
            className="text-2xl font-tech text-white mb-6 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <Cpu className="text-neon-green" />
            </motion.div>
            Technical Proficiency
          </motion.h3>

          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {SKILLS.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group"
                variants={itemVariants}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-bold text-gray-300">{skill.name}</span>
                  <span className="text-xs font-mono text-neon-green">
                    <AnimatedCounter target={skill.level} delay={500 + index * 100} />/100
                  </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-green relative group-hover:shadow-[0_0_10px_rgba(10,255,10,0.5)] transition-shadow"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{
                      duration: 1.5,
                      delay: 0.5 + index * 0.1,
                      ease: [0.6, -0.05, 0.01, 0.99],
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-card-bg p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ boxShadow: '0 0 30px rgba(188,19,254,0.2)' }}
        >
          <motion.h3
            className="text-xl font-gaming text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Core Attributes
          </motion.h3>

          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Animated Radar Background */}
            {[1, 2/3, 1/3].map((scale, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-gray-700"
                style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
              />
            ))}

            {/* Animated Attribute Labels */}
            <motion.div
              className="absolute top-0 text-neon-blue font-bold text-sm bg-dark-bg px-2 z-10 transform -translate-y-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              AI Logic
            </motion.div>
            <motion.div
              className="absolute bottom-0 text-neon-purple font-bold text-sm bg-dark-bg px-2 z-10 transform translate-y-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              Engineering
            </motion.div>
            <motion.div
              className="absolute left-0 text-neon-green font-bold text-sm bg-dark-bg px-2 z-10 transform -translate-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              Algorithms
            </motion.div>
            <motion.div
              className="absolute right-0 text-yellow-400 font-bold text-sm bg-dark-bg px-2 z-10 transform translate-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
            >
              Research
            </motion.div>

            {/* Animated SVG Shape */}
            <motion.svg
              viewBox="0 0 100 100"
              className="w-full h-full absolute inset-0 p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.polygon
                points="50,10 90,50 50,90 10,50"
                className="fill-neon-blue/20 stroke-neon-blue stroke-2 drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  delay: 1.2,
                  duration: 0.8,
                  ease: 'backOut',
                }}
                style={{ transformOrigin: '50px 50px' }}
              />
              {/* Animated lines */}
              {[
                { x1: 50, y1: 50, x2: 50, y2: 10 },
                { x1: 50, y1: 50, x2: 90, y2: 50 },
                { x1: 50, y1: 50, x2: 50, y2: 90 },
                { x1: 50, y1: 50, x2: 10, y2: 50 },
              ].map((line, i) => (
                <motion.line
                  key={i}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  className="stroke-gray-600 stroke-1 opacity-30"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                />
              ))}
            </motion.svg>

            {/* Rotating outer ring */}
            <motion.div
              className="absolute w-full h-full rounded-full border-2 border-dashed border-neon-blue/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Stats;
