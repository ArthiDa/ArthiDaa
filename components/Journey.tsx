import React from 'react';
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

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-5xl mx-auto">
      <h2 className="text-4xl font-gaming text-center mb-16 text-neon-purple drop-shadow-[0_0_5px_rgba(188,19,254,0.8)]">
        Quest Log
      </h2>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neon-blue before:to-transparent">
        {JOURNEY.map((item, index) => (
          <div key={item.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
            
            {/* Icon Node */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-neon-blue bg-dark-bg shadow-[0_0_10px_rgba(0,243,255,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-neon-blue">
              {getIcon(item.icon)}
            </div>

            {/* Content Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card-bg/80 backdrop-blur-sm border border-gray-700 p-6 rounded-xl hover:border-neon-green transition-colors duration-300 shadow-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl text-white">{item.title}</h3>
                <span className="text-xs font-mono text-neon-green border border-neon-green/30 px-2 py-0.5 rounded bg-neon-green/5">
                  {item.period}
                </span>
              </div>
              <div className="text-sm font-semibold text-neon-purple mb-2">{item.role}</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {item.tech.map(t => (
                  <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-gray-800 text-gray-300 rounded hover:bg-neon-blue hover:text-black transition-colors cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journey;