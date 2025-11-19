import React from 'react';
import { BIO } from '../constants';
import { ArrowRight, Terminal } from 'lucide-react';
import { Section } from '../types';

interface HeroProps {
  setSection: (s: Section) => void;
}

const Hero: React.FC<HeroProps> = ({ setSection }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] opacity-10 pointer-events-none">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="border border-neon-blue/20 h-full w-full" />
        ))}
      </div>

      <div className="z-10 text-center space-y-8 p-6 max-w-4xl">
        <div className="inline-block border border-neon-green px-4 py-1 rounded-full bg-neon-green/10 mb-4 animate-pulse">
          <span className="text-neon-green font-gaming text-xs">SYSTEM ONLINE</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold font-tech uppercase tracking-widest text-white drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
          {BIO.name}
        </h1>
        
        <div className="flex items-center justify-center gap-4 text-xl md:text-2xl text-neon-blue font-gaming">
          <Terminal size={24} />
          <span>{BIO.role}</span>
        </div>
        
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed border-l-4 border-neon-purple pl-6 text-left bg-black/40 p-4 rounded-r-lg">
          {BIO.intro}
        </p>

        <button 
          onClick={() => setSection(Section.JOURNEY)}
          className="group relative px-8 py-4 bg-transparent border-2 border-neon-blue text-neon-blue font-gaming uppercase text-sm hover:bg-neon-blue hover:text-black transition-all duration-300 mt-8"
        >
          <span className="absolute inset-0 w-full h-full bg-neon-blue/20 blur opacity-0 group-hover:opacity-100 transition-opacity"></span>
          Start Journey <ArrowRight className="inline ml-2 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Hero;