import React from 'react';
import { motion } from 'framer-motion';
import { JOURNEY } from '../constants';
import { Trophy, Code, Briefcase, GraduationCap } from 'lucide-react';

const Journey: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'school': return <GraduationCap size={20} />;
      case 'trophy': return <Trophy size={20} />;
      case 'code': return <Code size={20} />;
      default: return <Briefcase size={20} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-5xl mx-auto">
      <motion.h2
        className="text-4xl font-gaming text-center mb-16 text-neon-purple drop-shadow-[0_0_5px_rgba(188,19,254,0.8)]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Quest Log
      </motion.h2>

      <motion.div
        className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neon-blue before:to-transparent"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {JOURNEY.map((item, index) => (
          <motion.div
            key={item.id}
            className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}
            custom={index}
            variants={cardVariants}
          >
            {/* Icon Node */}
            <motion.div
              className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-neon-blue bg-dark-bg shadow-[0_0_10px_rgba(0,243,255,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-neon-blue"
              variants={nodeVariants}
              whileHover={{
                scale: 1.2,
                boxShadow: '0 0 25px rgba(0,243,255,0.8)',
              }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                {getIcon(item.icon)}
              </motion.div>
            </motion.div>

            {/* Content Card */}
            <motion.div
              className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card-bg/80 backdrop-blur-sm border border-gray-700 p-6 rounded-xl hover:border-neon-green transition-colors duration-300 shadow-lg"
              whileHover={{
                scale: 1.02,
                boxShadow: '0 0 30px rgba(10,255,10,0.2)',
                borderColor: 'rgba(10,255,10,0.8)',
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl text-white">{item.title}</h3>
                <motion.span
                  className="text-xs font-mono text-neon-green border border-neon-green/30 px-2 py-0.5 rounded bg-neon-green/5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {item.period}
                </motion.span>
              </div>
              <div className="text-sm font-semibold text-neon-purple mb-2">{item.role}</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>

              <div className="flex flex-wrap gap-2">
                {item.tech.map((t, techIndex) => (
                  <motion.span
                    key={t}
                    className="text-[10px] uppercase tracking-wider px-2 py-1 bg-gray-800 text-gray-300 rounded hover:bg-neon-blue hover:text-black transition-colors cursor-default"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 + techIndex * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Journey;
