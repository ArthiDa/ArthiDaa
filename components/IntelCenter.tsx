import React, { useState } from 'react';
import { generateWithSearch } from '../services/geminiService';
import { Search, Database, Globe, Terminal, Key, Lock, ChevronDown } from 'lucide-react';

const IntelCenter: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [query, setQuery] = useState('');
  const [model, setModel] = useState('gemini-2.5-flash');
  const [result, setResult] = useState<string | null>(null);
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim().length > 10) {
      setIsUnlocked(true);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    setResult(''); // Start empty for streaming
    setLinks([]);

    try {
      const data = await generateWithSearch(query, apiKey, model, (token) => {
        setResult(prev => (prev || '') + token);
      });
      setResult(data.text);
      setLinks(data.links);
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("404")) {
         setError("Model not found (404). Verify your API key has access to this model.");
      } else {
         setError("Access denied. Verify API Token validity or network status.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen pt-24 pb-32 px-4 max-w-md mx-auto flex flex-col items-center justify-center">
        <div className="w-full bg-card-bg border border-neon-green/50 p-8 rounded-xl shadow-[0_0_30px_rgba(10,255,10,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent animate-scanline"></div>
          
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-dark-bg rounded-full border border-neon-green text-neon-green">
              <Lock size={32} />
            </div>
          </div>
          
          <h2 className="text-2xl font-gaming text-center text-white mb-2">Security Clearance</h2>
          <p className="text-gray-400 text-center text-xs font-mono mb-6">Restricted Area. Enter Google GenAI Access Token to proceed.</p>
          
          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="relative">
              <Key className="absolute left-3 top-3 text-gray-500" size={16} />
              <input 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste API Key"
                className="w-full bg-dark-bg border border-gray-700 text-white pl-10 pr-4 py-2 rounded focus:border-neon-green focus:outline-none font-mono text-sm"
              />
            </div>
            <button 
              type="submit" 
              disabled={apiKey.trim().length < 10}
              className="w-full bg-neon-green/20 border border-neon-green text-neon-green py-2 rounded font-gaming hover:bg-neon-green hover:text-black transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Authenticate
            </button>

          </form>

          <div className="mt-6 text-center">
             <a 
               href="https://aistudio.google.com/app/apikey" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-xs text-gray-500 hover:text-neon-green underline decoration-dotted"
             >
               Obtain Access Token [Google AI Studio]
             </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-gaming text-neon-green drop-shadow-[0_0_5px_rgba(10,255,10,0.8)] mb-2">
            Intel Center
          </h2>
          <p className="text-gray-400 font-tech text-sm">
            Global Neural Network Access Point
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 px-3 py-1 rounded">
          <span className="text-gray-500 text-xs font-bold uppercase">Model:</span>
          <select 
            value={model} 
            onChange={(e) => setModel(e.target.value)}
            className="bg-transparent text-neon-green text-xs font-mono focus:outline-none cursor-pointer"
          >
            <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
            <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
          </select>
          <ChevronDown size={12} className="text-gray-500" />
        </div>
      </div>

      {/* Search Console */}
      <div className="bg-black/60 border border-neon-green/30 p-6 rounded-lg shadow-[0_0_20px_rgba(10,255,10,0.1)] backdrop-blur-sm">
        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Terminal className="text-neon-green" size={18} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter search query sequence..."
              className="w-full bg-gray-900 border border-gray-700 text-neon-green placeholder-gray-600 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-neon-green/20 border border-neon-green text-neon-green px-6 py-2 rounded-md font-gaming hover:bg-neon-green hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <span className="animate-pulse">SCANNING...</span>
            ) : (
              <>
                <Search size={16} /> SCAN
              </>
            )}
          </button>
        </form>

        {/* Output Display */}
        <div className="min-h-[300px] bg-gray-900 rounded p-4 font-mono text-sm relative overflow-hidden border border-gray-800">
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,255,10,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(10,255,10,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
          
          {error && (
             <div className="text-red-500 p-4 border border-red-500/50 bg-red-500/10 rounded">
               ERROR: {error}
             </div>
          )}

          {!result && !loading && !error && (
            <div className="flex flex-col items-center justify-center h-full text-gray-600 gap-4">
              <Database size={48} />
              <p>Awaiting input parameters...</p>
            </div>
          )}

          {loading && !result && (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-16 h-16 border-4 border-neon-green/30 border-t-neon-green rounded-full animate-spin"></div>
              <p className="text-neon-green animate-pulse">Decrypting Data Streams...</p>
            </div>
          )}

          {result && (
            <div className="relative z-10">
              <div className="mb-6 whitespace-pre-wrap text-gray-300 leading-relaxed">
                {result}
                {loading && <span className="animate-pulse inline-block w-2 h-4 bg-neon-green ml-1 align-middle"></span>}
              </div>

              {links.length > 0 && (
                <div className="border-t border-gray-800 pt-4 mt-4 animate-pulse-fast">
                  <h4 className="text-neon-green mb-3 flex items-center gap-2 text-xs uppercase tracking-wider">
                    <Globe size={12} /> Verified Sources
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {links.map((chunk, idx) => {
                      const web = chunk.web;
                      if (!web) return null;
                      return (
                        <a 
                          key={idx} 
                          href={web.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex flex-col bg-gray-800/50 p-3 rounded border border-gray-700 hover:border-neon-green hover:bg-gray-800 transition-colors group"
                        >
                          <span className="text-white font-bold text-xs truncate group-hover:text-neon-green">{web.title}</span>
                          <span className="text-gray-500 text-[10px] truncate">{web.uri}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntelCenter;