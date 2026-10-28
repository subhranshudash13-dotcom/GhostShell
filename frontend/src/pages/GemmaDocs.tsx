import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Cpu, Database, Network } from 'lucide-react';

const GemmaDocs = () => {
  return (
    <div className="min-h-screen bg-ghost-bg p-8 font-mono">
      <div className="scanline"></div>
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <Link to="/" className="text-ghost-spooky font-black uppercase hover:underline mb-8 inline-block decoration-4">← Return to Terminal</Link>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none text-white border-b-8 border-ghost-spooky pb-4">
            Gemma <span className="text-ghost-spooky">Protocol</span>
          </h1>
        </header>

        <div className="bg-black border-8 border-ghost-spooky p-8 shadow-brutal-white text-ghost-spooky">
          <h2 className="text-3xl font-black uppercase mb-6 flex items-center gap-2">
            <Cpu className="w-8 h-8" /> The Spectral Engine
          </h2>
          <p className="font-bold text-lg mb-8 text-white">
            GhostShell utilizes Google's Gemma 2 2B open-weight model, served locally via Ollama. 
            This allows for near-instantaneous possession of your shell commands.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-4 border-ghost-spooky p-4 bg-ghost-spooky/10">
              <h3 className="font-black uppercase mb-2 flex items-center gap-2">
                <Database className="w-5 h-5" /> Model Specs
              </h3>
              <ul className="space-y-1 text-sm font-bold text-white">
                <li>• Version: Gemma 2 2B</li>
                <li>• Quantization: 4-bit (recommended)</li>
                <li>• Backend: Ollama API</li>
                <li>• Context Window: 8k Tokens</li>
              </ul>
            </div>
            <div className="border-4 border-ghost-spooky p-4 bg-ghost-spooky/10">
              <h3 className="font-black uppercase mb-2 flex items-center gap-2">
                <Network className="w-5 h-5" /> Integration
              </h3>
              <ul className="space-y-1 text-sm font-bold text-white">
                <li>• API: http://localhost:11434</li>
                <li>• Temperature: 0.7 (Spooky)</li>
                <li>• Top-p: 0.9</li>
                <li>• System: Spectral Persona</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="bg-white text-black p-8 border-8 border-black shadow-brutal-spooky">
          <h2 className="text-3xl font-black uppercase mb-4 flex items-center gap-2">
            <Book className="w-8 h-8" /> Setup Ritual
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-100 p-4 border-2 border-black">
              <p className="font-black uppercase text-xs mb-2">1. Install Ollama</p>
              <code className="font-bold text-ghost-accent">curl -fsSL https://ollama.com/install.sh | sh</code>
            </div>
            <div className="bg-gray-100 p-4 border-2 border-black">
              <p className="font-black uppercase text-xs mb-2">2. Summon Gemma</p>
              <code className="font-bold text-ghost-accent">ollama pull gemma2:2b</code>
            </div>
            <div className="bg-gray-100 p-4 border-2 border-black">
              <p className="font-black uppercase text-xs mb-2">3. Ignite GhostShell</p>
              <code className="font-bold text-ghost-accent">python run.py</code>
            </div>
          </div>
        </section>

        <footer className="text-center pt-20 pb-12 opacity-50 font-black uppercase tracking-widest text-sm text-white">
          Documentation v2.0 // Gemma-Powered // Offline Enabled
        </footer>
      </div>
    </div>
  );
};

export default GemmaDocs;
