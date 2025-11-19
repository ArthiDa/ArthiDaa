import React, { useState } from 'react';
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

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.HOME);

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
      <Nav currentSection={currentSection} setSection={setCurrentSection} />

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
