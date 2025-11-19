import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../types';
import { Sword, Map, Radio, Beaker, Cpu, Home, BookOpen } from 'lucide-react';

interface NavProps {
  currentSection: Section;
  setSection: (s: Section) => void;
}

const Nav: React.FC<NavProps> = ({ currentSection, setSection }) => {
  const navItems = [
    { id: Section.HOME, label: 'Base', icon: Home },
    { id: Section.JOURNEY, label: 'Quest Log', icon: Map },
    { id: Section.SKILLS, label: 'Stats', icon: Cpu },
    { id: Section.PROJECTS, label: 'Inventory', icon: Sword },
    { id: Section.CONNECT, label: 'Connect', icon: Radio },
    { id: Section.INTEL_CENTER, label: 'Intel', icon: BookOpen },
    { id: Section.VEO_LAB, label: 'Magic Lab', icon: Beaker },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
      <motion.nav
        className="bg-gray-900/90 backdrop-blur-md border border-neon-blue/30 rounded-full px-6 py-3 shadow-[0_0_20px_rgba(0,243,255,0.2)] flex gap-2 md:gap-6 overflow-x-auto max-w-[95vw]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          delay: 0.5
        }}
      >
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = currentSection === item.id;
        return (
          <motion.button
            key={item.id}
            onClick={() => setSection(item.id)}
            className={`relative flex flex-col items-center gap-1 transition-colors duration-300 min-w-[60px] ${
              isActive ? 'text-neon-blue' : 'text-gray-400 hover:text-white'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.05 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className={`p-2 rounded-lg ${isActive ? 'bg-neon-blue/20' : 'bg-transparent'}`}
              animate={isActive ? {
                boxShadow: [
                  '0 0 0px rgba(0,243,255,0)',
                  '0 0 15px rgba(0,243,255,0.5)',
                  '0 0 0px rgba(0,243,255,0)',
                ],
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div
                animate={isActive ? {
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ duration: 0.3 }}
              >
                <Icon size={20} />
              </motion.div>
            </motion.div>
            <motion.span
              className="text-[10px] font-gaming tracking-tighter hidden md:block"
              animate={isActive ? { opacity: 1 } : { opacity: 0.7 }}
            >
              {item.label}
            </motion.span>
            {isActive && (
              <motion.div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-blue rounded-full"
                layoutId="activeIndicator"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
      </motion.nav>
    </div>
  );
};

export default Nav;
