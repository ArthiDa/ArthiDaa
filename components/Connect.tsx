import React from 'react';
import { Mail, Github, Linkedin, ExternalLink, Radio, Wifi } from 'lucide-react';

const Connect: React.FC = () => {
  const contacts = [
    {
      id: 'email',
      label: 'Encrypted Mail',
      value: 'arthida150@gmail.com',
      href: 'mailto:arthida150@gmail.com',
      icon: Mail,
      color: 'text-neon-green',
      borderColor: 'group-hover:border-neon-green'
    },
    {
      id: 'github',
      label: 'Code Repository',
      value: 'github.com/ArthiDa',
      href: 'https://github.com/ArthiDa',
      icon: Github,
      color: 'text-neon-purple',
      borderColor: 'group-hover:border-neon-purple'
    },
    {
      id: 'linkedin',
      label: 'Professional Network',
      value: 'linkedin.com/in/arthida',
      href: 'https://linkedin.com/in/arthida',
      icon: Linkedin,
      color: 'text-neon-blue',
      borderColor: 'group-hover:border-neon-blue'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-4xl mx-auto flex flex-col items-center justify-center">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neon-green/10 border border-neon-green/50 text-neon-green text-xs font-mono animate-pulse">
          <Wifi size={12} /> SIGNAL STRENGTH: 100%
        </div>
        <h2 className="text-4xl md:text-6xl font-gaming text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          Uplink Center
        </h2>
        <p className="text-gray-400 font-tech text-lg max-w-lg mx-auto">
          Establish a direct connection with the developer. All channels are open and encrypted.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {contacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <a
              key={contact.id}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-card-bg border border-gray-800 p-8 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] ${contact.borderColor}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
              
              <div className={`mb-6 p-4 rounded-full bg-gray-900 w-16 h-16 flex items-center justify-center border border-gray-700 group-hover:scale-110 transition-transform duration-300 ${contact.color}`}>
                <Icon size={32} />
              </div>

              <div className="space-y-2">
                <h3 className="text-gray-500 text-xs uppercase font-bold tracking-wider font-gaming">
                  {contact.label}
                </h3>
                <div className="flex items-center gap-2 text-white font-tech text-lg group-hover:text-neon-blue transition-colors">
                  <span className="truncate">{contact.value}</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-600 group-hover:border-white transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-600 group-hover:border-white transition-colors"></div>
            </a>
          );
        })}
      </div>

      <div className="mt-16 flex items-center gap-4 text-gray-500 font-mono text-sm">
        <Radio className="animate-ping" size={12} />
        <span>Waiting for incoming transmission...</span>
      </div>
    </div>
  );
};

export default Connect;