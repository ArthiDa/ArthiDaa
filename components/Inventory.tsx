import React, { useState } from 'react';
import { PROJECTS, PAPERS } from '../constants';
import { FolderGit2, FileText, ExternalLink, Star } from 'lucide-react';

const Inventory: React.FC = () => {
  const [tab, setTab] = useState<'projects' | 'papers'>('projects');

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-gaming text-center mb-12 text-neon-blue drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]">
        Inventory
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-12">
        <button 
          onClick={() => setTab('projects')}
          className={`px-6 py-2 font-gaming text-sm uppercase border-b-2 transition-all ${tab === 'projects' ? 'border-neon-blue text-neon-blue' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          Projects
        </button>
        <button 
          onClick={() => setTab('papers')}
          className={`px-6 py-2 font-gaming text-sm uppercase border-b-2 transition-all ${tab === 'papers' ? 'border-neon-purple text-neon-purple' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          Papers (Research)
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tab === 'projects' ? (
          PROJECTS.map(project => (
            <div key={project.id} className="group relative bg-card-bg border border-gray-800 p-6 rounded-xl hover:border-neon-blue transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <FolderGit2 className="text-neon-blue" size={40} />
              </div>
              
              <div className="mb-4">
                <span className={`text-xs font-bold px-2 py-1 rounded ${project.type === 'professional' ? 'bg-neon-purple/20 text-neon-purple' : 'bg-neon-green/20 text-neon-green'}`}>
                  {project.type.toUpperCase()}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 font-tech">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-6 min-h-[80px]">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map(tech => (
                  <span key={tech} className="text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded border border-gray-700">
                    {tech}
                  </span>
                ))}
              </div>

              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm text-neon-blue hover:underline font-gaming">
                  Source <ExternalLink size={12} className="ml-2" />
                </a>
              )}
            </div>
          ))
        ) : (
          PAPERS.map((paper, idx) => (
            <div key={idx} className="group relative bg-card-bg border border-gray-800 p-6 rounded-xl hover:border-neon-purple transition-all duration-300 hover:-translate-y-2 col-span-1 md:col-span-2 lg:col-span-1">
              <div className="absolute -top-3 -left-3 bg-dark-bg border border-gray-700 p-2 rounded-full">
                <FileText className="text-gray-400 group-hover:text-neon-purple" size={24} />
              </div>

              {paper.award && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-yellow-400 text-xs font-bold animate-pulse">
                  <Star size={14} fill="currentColor" /> {paper.award}
                </div>
              )}

              <div className="mt-4 mb-2 text-neon-purple font-mono text-sm">{paper.conference}</div>
              <h3 className="text-xl font-bold text-white mb-4 font-tech leading-tight">{paper.title}</h3>
              <p className="text-gray-400 text-sm italic border-l-2 border-gray-700 pl-4">{paper.abstract}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Inventory;