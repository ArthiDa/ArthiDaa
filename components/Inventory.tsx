import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, PAPERS } from '../constants';
import { FolderGit2, FileText, ExternalLink, Star } from 'lucide-react';

// 3D Tilt Card Component
const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}> = ({ children, className = '', glowColor = 'rgba(0,243,255,0.3)' }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    cardRef.current.style.boxShadow = `0 0 30px ${glowColor}`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    cardRef.current.style.boxShadow = 'none';
  };

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

const Inventory: React.FC = () => {
  const [tab, setTab] = useState<'projects' | 'papers'>('projects');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-6xl mx-auto">
      <motion.h2
        className="text-4xl font-gaming text-center mb-12 text-neon-blue drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Inventory
      </motion.h2>

      {/* Animated Tabs */}
      <motion.div
        className="flex justify-center gap-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          onClick={() => setTab('projects')}
          className={`px-6 py-2 font-gaming text-sm uppercase border-b-2 transition-all relative ${tab === 'projects' ? 'border-neon-blue text-neon-blue' : 'border-transparent text-gray-500 hover:text-white'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Projects
          {tab === 'projects' && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue"
              layoutId="tabIndicator"
            />
          )}
        </motion.button>
        <motion.button
          onClick={() => setTab('papers')}
          className={`px-6 py-2 font-gaming text-sm uppercase border-b-2 transition-all relative ${tab === 'papers' ? 'border-neon-purple text-neon-purple' : 'border-transparent text-gray-500 hover:text-white'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Papers (Research)
          {tab === 'papers' && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-purple"
              layoutId="tabIndicator"
            />
          )}
        </motion.button>
      </motion.div>

      {/* Animated Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {tab === 'projects' ? (
            PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
              >
                <TiltCard
                  className="group relative bg-card-bg border border-gray-800 p-6 rounded-xl hover:border-neon-blue h-full"
                  glowColor="rgba(0,243,255,0.3)"
                >
                <motion.div
                  className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                >
                  <FolderGit2 className="text-neon-blue" size={40} />
                </motion.div>

                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className={`text-xs font-bold px-2 py-1 rounded ${project.type === 'professional' ? 'bg-neon-purple/20 text-neon-purple' : 'bg-neon-green/20 text-neon-green'}`}>
                    {project.type.toUpperCase()}
                  </span>
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-3 font-tech">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6 min-h-[80px]">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      className="text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded border border-gray-700"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 + techIndex * 0.05 }}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: 'rgba(0,243,255,0.2)',
                        borderColor: 'rgba(0,243,255,0.5)',
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-sm text-neon-blue hover:underline font-gaming"
                    whileHover={{ x: 5 }}
                  >
                    Source <ExternalLink size={12} className="ml-2" />
                  </motion.a>
                )}
                </TiltCard>
              </motion.div>
            ))
          ) : (
            PAPERS.map((paper, idx) => (
              <motion.div
                key={idx}
                className="group relative bg-card-bg border border-gray-800 p-6 rounded-xl hover:border-neon-purple transition-colors duration-300 col-span-1 md:col-span-2 lg:col-span-1"
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  boxShadow: '0 0 30px rgba(188,19,254,0.3)',
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute -top-3 -left-3 bg-dark-bg border border-gray-700 p-2 rounded-full"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FileText className="text-gray-400 group-hover:text-neon-purple transition-colors" size={24} />
                </motion.div>

                {paper.award && (
                  <motion.div
                    className="absolute top-4 right-4 flex items-center gap-1 text-yellow-400 text-xs font-bold"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [1, 0.8, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    >
                      <Star size={14} fill="currentColor" />
                    </motion.div>
                    {paper.award}
                  </motion.div>
                )}

                <div className="mt-4 mb-2 text-neon-purple font-mono text-sm">{paper.conference}</div>
                <h3 className="text-xl font-bold text-white mb-4 font-tech leading-tight">{paper.title}</h3>
                <p className="text-gray-400 text-sm italic border-l-2 border-gray-700 pl-4">{paper.abstract}</p>
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Inventory;
