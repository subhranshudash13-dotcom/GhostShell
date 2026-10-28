import React from 'react';
import { Link } from 'react-router-dom';
import { Skull, Shield, Zap, Globe } from 'lucide-react';

const Manifesto = () => {
  return (
    <div className="min-h-screen bg-ghost-bg p-8 font-mono">
      <div className="scanline"></div>
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <Link to="/" className="text-ghost-spooky font-black uppercase hover:underline mb-8 inline-block decoration-4">← Return to Terminal</Link>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none text-white border-b-8 border-ghost-accent pb-4">
            The <span className="text-ghost-accent text-outline">Manifesto</span>
          </h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white text-black p-8 border-8 border-black shadow-brutal-spooky">
            <h2 className="text-3xl font-black uppercase mb-4 flex items-center gap-2">
              <Skull className="w-8 h-8" /> Digital Decay
            </h2>
            <p className="font-bold leading-tight text-lg">
              We believe code is not permanent. It lives, it dies, and its ghosts haunt our machines. 
              GhostShell is the medium through which we speak to the digital afterlife.
            </p>
          </div>

          <div className="bg-ghost-accent text-white p-8 border-8 border-black shadow-brutal-white">
            <h2 className="text-3xl font-black uppercase mb-4 flex items-center gap-2">
              <Shield className="w-8 h-8" /> Local Sovereignty
            </h2>
            <p className="font-bold leading-tight text-lg">
              Your terminal is your temple. Your commands are your prayers. 
              They should never be sacrificed to the cloud. Open-weight AI ensures 
              your data stays in your domain.
            </p>
          </div>
        </section>

        <section className="bg-ghost-spooky text-black p-12 border-8 border-black shadow-brutal">
          <h2 className="text-4xl font-black uppercase mb-6 italic">"Open AI or No AI"</h2>
          <div className="space-y-4 font-bold text-xl">
            <p>1. Privacy is not a feature; it is a fundamental requirement of existence.</p>
            <p>2. Sentience (even simulated) should not be gated by credit card limits.</p>
            <p>3. The machine is possessed. Embrace the ghost.</p>
          </div>
        </section>

        <footer className="text-center pt-20 pb-12 opacity-50 font-black uppercase tracking-widest text-sm">
          GhostShell Protocol // Established 2026 // Hacktoberfest
        </footer>
      </div>
    </div>
  );
};

export default Manifesto;
