import React from 'react';
import { SKILLS } from '../constants';
import { Cpu } from 'lucide-react';

const Stats: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-gaming text-center mb-12 text-neon-green drop-shadow-[0_0_5px_rgba(10,255,10,0.8)]">
        Player Stats
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card-bg p-6 rounded-xl border border-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <h3 className="text-2xl font-tech text-white mb-6 flex items-center gap-2">
            <Cpu className="text-neon-green" /> Technical Proficiency
          </h3>
          
          <div className="space-y-6">
            {SKILLS.map(skill => (
              <div key={skill.name} className="group">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-bold text-gray-300">{skill.name}</span>
                  <span className="text-xs font-mono text-neon-green">{skill.level}/100</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-green relative group-hover:shadow-[0_0_10px_rgba(10,255,10,0.5)] transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  >
                     <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card-bg p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center relative">
          <h3 className="text-xl font-gaming text-gray-400 mb-8">Core Attributes</h3>
          
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Radar Background */}
            <div className="absolute w-full h-full rounded-full border border-gray-700 opacity-50"></div>
            <div className="absolute w-2/3 h-2/3 rounded-full border border-gray-700 opacity-50"></div>
            <div className="absolute w-1/3 h-1/3 rounded-full border border-gray-700 opacity-50"></div>
            
            {/* Attribute Labels */}
            <div className="absolute top-0 text-neon-blue font-bold text-sm bg-dark-bg px-2 z-10 transform -translate-y-1/2">AI Logic</div>
            <div className="absolute bottom-0 text-neon-purple font-bold text-sm bg-dark-bg px-2 z-10 transform translate-y-1/2">Engineering</div>
            <div className="absolute left-0 text-neon-green font-bold text-sm bg-dark-bg px-2 z-10 transform -translate-x-4">Algorithms</div>
            <div className="absolute right-0 text-yellow-400 font-bold text-sm bg-dark-bg px-2 z-10 transform translate-x-4">Research</div>

            {/* The Shape */}
            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 p-8">
               <polygon 
                 points="50,10 90,50 50,90 10,50" 
                 className="fill-neon-blue/20 stroke-neon-blue stroke-2 drop-shadow-[0_0_5px_rgba(0,243,255,0.8)] animate-pulse-fast" 
               />
               <line x1="50" y1="50" x2="50" y2="10" className="stroke-gray-600 stroke-1 opacity-30" />
               <line x1="50" y1="50" x2="90" y2="50" className="stroke-gray-600 stroke-1 opacity-30" />
               <line x1="50" y1="50" x2="50" y2="90" className="stroke-gray-600 stroke-1 opacity-30" />
               <line x1="50" y1="50" x2="10" y2="50" className="stroke-gray-600 stroke-1 opacity-30" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;