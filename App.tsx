import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Journey from './components/Journey';
import Inventory from './components/Inventory';
import Stats from './components/Stats';
import IntelCenter from './components/IntelCenter';
import VeoLab from './components/VeoLab';
import Connect from './components/Connect';
import { Section } from './types';

// Boot Sequence Component
const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);

  const bootMessages = [
    '> INITIALIZING SYSTEM...',
    '> LOADING NEURAL NETWORKS...',
    '> CALIBRATING AI MODULES...',
    '> ESTABLISHING SECURE CONNECTION...',
    '> LOADING USER PROFILE: PRANAB BARUA ARTHI',
    '> MOUNTING SKILL MATRICES...',
    '> INITIALIZING PROJECT DATABASE...',
    '> SYSTEM CHECK: ALL MODULES OPERATIONAL',
    '> BOOT SEQUENCE COMPLETE',
    '> WELCOME, VISITOR',
  ];

  useEffect(() => {
    if (currentLine < bootMessages.length) {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, bootMessages[currentLine]]);
        setCurrentLine(prev => prev + 1);
        setProgress(((currentLine + 1) / bootMessages.length) * 100);
      }, 200);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(onComplete, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-dark-bg z-[100] flex flex-col items-center justify-center p-8"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-2xl">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-neon-blue/30">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-4 text-gray-500 font-mono text-sm">system_boot.exe</span>
        </div>

        {/* Boot Messages */}
        <div className="font-mono text-sm space-y-1 mb-6 h-64 overflow-hidden">
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${
                line.includes('COMPLETE') || line.includes('WELCOME')
                  ? 'text-neon-green'
                  : line.includes('ERROR')
                  ? 'text-red-500'
                  : 'text-neon-blue'
              }`}
            >
              {line}
            </motion.div>
          ))}
          {currentLine < bootMessages.length && (
            <span className="text-neon-blue animate-pulse">_</span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-right text-xs text-gray-500 mt-1 font-mono">
          {Math.round(progress)}%
        </div>
      </div>
    </motion.div>
  );
};

// Cursor Trail Component
const CursorTrail: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-[60] w-6 h-6 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,243,255,0.3) 0%, transparent 70%)',
          boxShadow: '0 0 20px rgba(0,243,255,0.5)',
        }}
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />
      {/* Trail particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-[59] w-2 h-2 rounded-full bg-neon-blue/30"
          animate={{
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            opacity: isVisible ? 0.5 - i * 0.1 : 0,
            scale: 1 - i * 0.15,
          }}
          transition={{
            type: 'spring',
            damping: 30 + i * 5,
            stiffness: 200 - i * 20,
          }}
        />
      ))}
    </>
  );
};

// Floating Geometric Shapes Background
const FloatingShapes: React.FC = () => {
  const shapes = [
    { type: 'circle', size: 100, x: '10%', y: '20%', duration: 20, color: 'neon-blue' },
    { type: 'square', size: 80, x: '80%', y: '30%', duration: 25, color: 'neon-purple' },
    { type: 'triangle', size: 60, x: '20%', y: '70%', duration: 18, color: 'neon-green' },
    { type: 'circle', size: 40, x: '70%', y: '80%', duration: 22, color: 'neon-blue' },
    { type: 'square', size: 50, x: '50%', y: '10%', duration: 30, color: 'neon-purple' },
    { type: 'hexagon', size: 70, x: '90%', y: '60%', duration: 28, color: 'neon-green' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {shape.type === 'circle' && (
            <div
              className={`rounded-full border border-${shape.color}/20`}
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === 'square' && (
            <div
              className={`border border-${shape.color}/20`}
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === 'triangle' && (
            <div
              className={`border-l-transparent border-r-transparent border-b-${shape.color}/20`}
              style={{
                width: 0,
                height: 0,
                borderLeftWidth: shape.size / 2,
                borderRightWidth: shape.size / 2,
                borderBottomWidth: shape.size,
                borderBottomColor: `rgba(0,243,255,0.1)`,
              }}
            />
          )}
          {shape.type === 'hexagon' && (
            <svg width={shape.size} height={shape.size} viewBox="0 0 100 100">
              <polygon
                points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className={`text-${shape.color}/20`}
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.HOME);
  const [isBooting, setIsBooting] = useState(true);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const renderSection = () => {
    switch (currentSection) {
      case Section.HOME:
        return <Hero setSection={setCurrentSection} />;
      case Section.JOURNEY:
        return <Journey />;
      case Section.SKILLS:
        return <Stats />;
      case Section.PROJECTS:
        return <Inventory />;
      case Section.CONNECT:
        return <Connect />;
      case Section.INTEL_CENTER:
        return <IntelCenter />;
      case Section.VEO_LAB:
        return <VeoLab />;
      default:
        return <Hero setSection={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 font-tech selection:bg-neon-blue selection:text-black overflow-x-hidden">
      {/* Boot Sequence */}
      <AnimatePresence>
        {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      {/* Cursor Trail */}
      <CursorTrail />

      {/* Floating Geometric Shapes */}
      <FloatingShapes />

      {/* Animated Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Render active section with page transitions */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Fixed Navigation */}
      {!isBooting && <Nav currentSection={currentSection} setSection={setCurrentSection} />}

      {/* Background Ambience Overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050510_100%)] opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />

      {/* Animated corner decorations */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-neon-blue/20 pointer-events-none z-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
      <motion.div
        className="fixed top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-neon-purple/20 pointer-events-none z-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      />
      <motion.div
        className="fixed bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-neon-green/20 pointer-events-none z-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      />
      <motion.div
        className="fixed bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-neon-blue/20 pointer-events-none z-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
    </div>
  );
};

export default App;
