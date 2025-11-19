import React from 'react';
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
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-md border border-neon-blue/30 rounded-full px-6 py-3 z-50 shadow-[0_0_20px_rgba(0,243,255,0.2)] flex gap-2 md:gap-6 overflow-x-auto max-w-[95vw]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setSection(item.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 min-w-[60px] ${
              isActive ? 'text-neon-blue scale-110' : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className={`p-2 rounded-lg ${isActive ? 'bg-neon-blue/20' : 'bg-transparent'}`}>
              <Icon size={20} />
            </div>
            <span className="text-[10px] font-gaming tracking-tighter hidden md:block">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Nav;