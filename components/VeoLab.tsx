import React, { useState, useRef } from 'react';
import { generateVeoVideo } from '../services/geminiService';
import { Clapperboard, Upload, Play, AlertCircle, Film, Lock, Key, ChevronDown } from 'lucide-react';

const VeoLab: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('veo-3.1-fast-generate-preview');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim().length > 10) {
      setIsUnlocked(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!imageFile || !previewUrl) {
      setError("Please upload a source image first.");
      return;
    }

    setLoading(true);
    setError('');
    setVideoUrl(null);

    try {
      // Convert file to base64 string for service
      const base64Data = previewUrl; 
      const mimeType = imageFile.type;

      const generatedVideoUrl = await generateVeoVideo(prompt, base64Data, mimeType, aspectRatio, apiKey, model);
      setVideoUrl(generatedVideoUrl);
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("404")) {
        setError("Model not found (404). Verify your API key has access to Veo models.");
      } else {
        setError(err.message || "Simulation failed. Check API Key quota or validity.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isUnlocked) {
      return (
        <div className="min-h-screen pt-24 pb-32 px-4 max-w-md mx-auto flex flex-col items-center justify-center">
          <div className="w-full bg-card-bg border border-neon-purple/50 p-8 rounded-xl shadow-[0_0_30px_rgba(188,19,254,0.1)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent animate-scanline"></div>
            
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-dark-bg rounded-full border border-neon-purple text-neon-purple">
                <Lock size={32} />
              </div>
            </div>
            
            <h2 className="text-2xl font-gaming text-center text-white mb-2">Media Lab Locked</h2>
            <p className="text-gray-400 text-center text-xs font-mono mb-6">Requires high-level authorization. Enter Google GenAI Access Token.</p>
            
            <form onSubmit={handleUnlock} className="space-y-4">
              <div className="relative">
                <Key className="absolute left-3 top-3 text-gray-500" size={16} />
                <input 
                  type="password" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste API Key"
                  className="w-full bg-dark-bg border border-gray-700 text-white pl-10 pr-4 py-2 rounded focus:border-neon-purple focus:outline-none font-mono text-sm"
                />
              </div>
              <button 
                type="submit" 
                disabled={apiKey.trim().length < 10}
                className="w-full bg-neon-purple/20 border border-neon-purple text-neon-purple py-2 rounded font-gaming hover:bg-neon-purple hover:text-black transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Access Lab
              </button>
            </form>
  
            <div className="mt-6 text-center">
               <a 
                 href="https://aistudio.google.com/app/apikey" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-xs text-gray-500 hover:text-neon-purple underline decoration-dotted"
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
          <h2 className="text-4xl font-gaming text-neon-purple drop-shadow-[0_0_5px_rgba(188,19,254,0.8)] mb-2">
            Veo Lab
          </h2>
          <p className="text-gray-400 font-tech text-sm">
            Powered by <span className="text-white font-bold">Google Veo</span>
          </p>
        </div>

        <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 px-3 py-1 rounded">
          <span className="text-gray-500 text-xs font-bold uppercase">Engine:</span>
          <select 
            value={model} 
            onChange={(e) => setModel(e.target.value)}
            className="bg-transparent text-neon-purple text-xs font-mono focus:outline-none cursor-pointer"
          >
            <option value="veo-3.1-fast-generate-preview">Veo 3.1 Fast (Preview)</option>
            <option value="veo-3.1-generate-preview">Veo 3.1 High-Res (Preview)</option>
          </select>
          <ChevronDown size={12} className="text-gray-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <div className="bg-card-bg border border-gray-800 p-6 rounded-xl">
          <h3 className="text-xl font-tech text-white mb-4 flex items-center gap-2">
            <Upload size={20} className="text-neon-purple" /> Source Material
          </h3>
          
          {/* File Upload */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 mb-6 flex flex-col items-center justify-center cursor-pointer transition-colors aspect-video relative overflow-hidden ${
              previewUrl ? 'border-neon-purple/50' : 'border-gray-700 hover:border-gray-500'
            }`}
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <div className="bg-gray-800 p-3 rounded-full mb-2">
                  <Upload size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">Click to upload image</p>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          {/* Aspect Ratio Selection */}
          <div className="mb-6">
             <label className="block text-gray-400 text-xs uppercase mb-2 font-bold">Output Format</label>
             <div className="flex gap-4">
               <button 
                 onClick={() => setAspectRatio('16:9')}
                 className={`flex-1 py-2 px-4 rounded border text-sm font-gaming transition-colors ${aspectRatio === '16:9' ? 'border-neon-purple bg-neon-purple/20 text-white' : 'border-gray-700 text-gray-500 hover:bg-gray-800'}`}
               >
                 Landscape (16:9)
               </button>
               <button 
                 onClick={() => setAspectRatio('9:16')}
                 className={`flex-1 py-2 px-4 rounded border text-sm font-gaming transition-colors ${aspectRatio === '9:16' ? 'border-neon-purple bg-neon-purple/20 text-white' : 'border-gray-700 text-gray-500 hover:bg-gray-800'}`}
               >
                 Portrait (9:16)
               </button>
             </div>
          </div>

          {/* Prompt Input */}
          <div className="mb-6">
            <label className="block text-gray-400 text-xs uppercase mb-2 font-bold">Prompt Directive</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the motion (e.g., 'The cybernetic city lights flickering in the rain')..."
              className="w-full bg-dark-bg border border-gray-700 rounded p-3 text-white text-sm h-24 focus:outline-none focus:border-neon-purple transition-colors resize-none"
            />
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle size={16} /> 
              <span className="flex-1">{error}</span>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !imageFile}
            className="w-full bg-neon-purple text-black font-gaming py-4 rounded hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            {loading ? (
               <span className="animate-pulse">RENDERING SIMULATION...</span>
            ) : (
               <span className="flex items-center justify-center gap-2">
                 <Clapperboard size={18} /> GENERATE VIDEO
               </span>
            )}
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>

        {/* Output Panel */}
        <div className="bg-card-bg border border-gray-800 p-6 rounded-xl flex flex-col">
          <h3 className="text-xl font-tech text-white mb-4 flex items-center gap-2">
            <Film size={20} className="text-neon-blue" /> Render Output
          </h3>
          
          <div className="flex-1 bg-black rounded-lg border border-gray-800 flex items-center justify-center overflow-hidden min-h-[300px] relative">
            {loading ? (
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-neon-purple border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-neon-purple text-sm font-mono animate-pulse">Processing Neural Frames...</p>
                <p className="text-gray-600 text-xs">This may take a minute</p>
              </div>
            ) : videoUrl ? (
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                loop 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-gray-600 flex flex-col items-center gap-2">
                <Play size={48} className="opacity-20" />
                <span className="text-sm font-mono">No signal detected</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeoLab;