import React from 'react';
import { motion } from 'framer-motion';
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
      borderColor: 'group-hover:border-neon-green',
      glowColor: 'rgba(10,255,10,0.3)',
    },
    {
      id: 'github',
      label: 'Code Repository',
      value: 'github.com/ArthiDa',
      href: 'https://github.com/ArthiDa',
      icon: Github,
      color: 'text-neon-purple',
      borderColor: 'group-hover:border-neon-purple',
      glowColor: 'rgba(188,19,254,0.3)',
    },
    {
      id: 'linkedin',
      label: 'Professional Network',
      value: 'linkedin.com/in/arthida',
      href: 'https://linkedin.com/in/arthida',
      icon: Linkedin,
      color: 'text-neon-blue',
      borderColor: 'group-hover:border-neon-blue',
      glowColor: 'rgba(0,243,255,0.3)',
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-4xl mx-auto flex flex-col items-center justify-center">
      <motion.div
        className="text-center mb-16 space-y-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neon-green/10 border border-neon-green/50 text-neon-green text-xs font-mono"
          animate={{
            boxShadow: [
              '0 0 0px rgba(10,255,10,0)',
              '0 0 20px rgba(10,255,10,0.5)',
              '0 0 0px rgba(10,255,10,0)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Wifi size={12} />
          </motion.div>
          SIGNAL STRENGTH: 100%
        </motion.div>
        <motion.h2
          className="text-4xl md:text-6xl font-gaming text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Uplink Center
        </motion.h2>
        <motion.p
          className="text-gray-400 font-tech text-lg max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Establish a direct connection with the developer. All channels are open and encrypted.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {contacts.map((contact, index) => {
          const Icon = contact.icon;
          return (
            <motion.a
              key={contact.id}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-card-bg border border-gray-800 p-8 rounded-xl transition-colors duration-300 ${contact.borderColor}`}
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: `0 0 30px ${contact.glowColor}`,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              <motion.div
                className={`mb-6 p-4 rounded-full bg-gray-900 w-16 h-16 flex items-center justify-center border border-gray-700 ${contact.color}`}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  <Icon size={32} />
                </motion.div>
              </motion.div>

              <div className="space-y-2">
                <motion.h3
                  className="text-gray-500 text-xs uppercase font-bold tracking-wider font-gaming"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {contact.label}
                </motion.h3>
                <motion.div
                  className="flex items-center gap-2 text-white font-tech text-lg group-hover:text-neon-blue transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span className="truncate">{contact.value}</span>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    <ExternalLink size={14} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Animated corner accents */}
              <motion.div
                className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-600 group-hover:border-white transition-colors"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-600 group-hover:border-white transition-colors"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              />
              <motion.div
                className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gray-600/50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gray-600/50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              />
            </motion.a>
          );
        })}
      </motion.div>

      <motion.div
        className="mt-16 flex items-center gap-4 text-gray-500 font-mono text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Radio size={12} />
        </motion.div>
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Waiting for incoming transmission...
        </motion.span>
      </motion.div>
    </div>
  );
};

export default Connect;
