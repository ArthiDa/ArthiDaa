import React, { useState } from 'react';
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

  const renderSection = () => {
    switch (currentSection) {
      case Section.HOME:
        return <Hero setSection={setCurrentSection} />;
      case Section.JOURNEY:
        return <Journey />;
      case Section.SKILLS:
        return <Stats />;
      case Section.PROJECTS:
        // Inventory handles both projects and papers internally via tabs
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
      {/* Render active section */}
      <main className="relative z-10">
        {renderSection()}
      </main>

      {/* Fixed Navigation */}
      <Nav currentSection={currentSection} setSection={setCurrentSection} />
      
      {/* Background Ambience Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050510_100%)] opacity-50"></div>
    </div>
  );
};

export default App;