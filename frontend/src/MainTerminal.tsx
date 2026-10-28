import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Ghost, Flame, Archive, Skull, Terminal as TerminalIcon, Send, RefreshCcw, Radio, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface HistoryItem {
  command: string;
  output: string;
  whisper: string;
  isError: boolean;
  timestamp: string;
}

const MainTerminal = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPossessed, setIsPossessed] = useState(false);
  const [ofrenda, setOfrenda] = useState<string | null>(null);
  const [showOfrenda, setShowOfrenda] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, mock: true }),
      });
      const data = await response.json();
      
      const newItem: HistoryItem = {
        command,
        output: data.command_output,
        whisper: data.ghostly_whisper,
        isError: data.is_error,
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setHistory(prev => [...prev, newItem]);
      setCommand('');
      setIsPossessed(true);
      setTimeout(() => setIsPossessed(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateOfrenda = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ofrenda?mock=true');
      const data = await res.json();
      setOfrenda(data.ofrenda);
      setShowOfrenda(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={clsx(
      "min-h-screen p-4 md:p-8 transition-colors duration-500 font-mono",
      isPossessed ? "bg-ghost-accent" : "bg-ghost-bg"
    )}>
      <div className="scanline"></div>
      
      <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 text-white">
            Ghost<span className="text-ghost-spooky">Shell</span>
          </h1>
          <p className="bg-ghost-spooky text-black font-bold px-4 py-2 inline-block border-4 border-black shadow-brutal-white uppercase text-xl">
            Possession-as-a-Service
          </p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={generateOfrenda}
            className="bg-ghost-accent text-white p-4 border-4 border-black font-black uppercase flex items-center gap-2 hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-brutal-white"
          >
            <Flame className="w-6 h-6" />
            Digital Ofrenda
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-black border-4 border-black shadow-brutal p-6 relative min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b-4 border-ghost-accent pb-2">
              <div className="flex items-center gap-2 text-ghost-accent font-black">
                <TerminalIcon className="w-5 h-5" />
                POSSESSED_TERMINAL.EXE
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 border-2 border-black"></div>
                <div className="w-3 h-3 bg-yellow-500 border-2 border-black"></div>
                <div className="w-3 h-3 bg-green-500 border-2 border-black"></div>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto mb-4 space-y-6 text-sm md:text-base pr-2">
              {history.length === 0 && (
                <div className="text-ghost-spooky opacity-50 italic">
                  Waiting for a living soul to type...
                </div>
              )}
              {history.map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className="space-y-2 border-l-4 border-ghost-spooky pl-4"
                >
                  <div className="flex items-center gap-2 text-ghost-spooky font-bold">
                    <span>$</span> {item.command}
                    <span className="text-[10px] opacity-30 font-normal ml-auto">{item.timestamp}</span>
                  </div>
                  <pre className="text-gray-400 whitespace-pre-wrap break-all">{item.output}</pre>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-ghost-accent text-white p-3 border-2 border-black flex items-start gap-2 shadow-[4px_4px_0px_0px_white]"
                  >
                    <Ghost className="w-5 h-5 shrink-0 animate-pulse" />
                    <span className="italic">"{item.whisper}"</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <form onSubmit={handleCommand} className="mt-auto flex gap-4">
              <input 
                type="text" 
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Execute command..."
                className="flex-1 bg-transparent border-4 border-ghost-accent p-4 text-ghost-accent font-bold focus:outline-none placeholder:text-ghost-accent/30"
              />
              <button 
                disabled={loading}
                className="bg-ghost-spooky text-black border-4 border-black p-4 font-black hover:bg-white transition-colors disabled:opacity-50"
              >
                {loading ? <RefreshCcw className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
              </button>
            </form>
          </div>
        </section>

        <aside className="space-y-8">
          <div className="bg-white text-black border-4 border-black p-6 shadow-brutal-spooky">
            <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
              <Skull className="w-6 h-6" /> System Status
            </h2>
            <div className="space-y-2 font-bold">
              <div className="flex justify-between">
                <span>MODEL:</span>
                <span className="text-ghost-accent">GEMMA 2 2B</span>
              </div>
              <div className="flex justify-between">
                <span>POSSESSION:</span>
                <span className="flex items-center gap-1">
                  <Activity className="w-4 h-4 text-red-600 animate-pulse" />
                  {history.length > 0 ? "98%" : "0%"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-ghost-accent text-white border-4 border-black p-6 shadow-brutal-white">
            <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
              <Radio className="w-6 h-6" /> Spirit Radio
            </h2>
            <div className="animate-pulse space-y-1 font-bold text-xs">
              <p>SIGNAL: [|||||||||||.....]</p>
              <p>FREQ: 66.6 MHz</p>
              <p>STATUS: RECEIVING WHISPERS</p>
            </div>
          </div>

          <AnimatePresence>
            {showOfrenda && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-black border-4 border-white p-6 shadow-brutal-white"
              >
                <div className="flex justify-between items-center mb-4 text-white">
                  <h3 className="text-ghost-accent font-black uppercase">🕯️ The Ofrenda</h3>
                  <button onClick={() => setShowOfrenda(false)}>✕</button>
                </div>
                <p className="italic text-lg text-gray-200 leading-relaxed">{ofrenda}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </main>

      <footer className="max-w-6xl mx-auto mt-20 border-t-8 border-black pt-8 flex flex-col gap-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white text-black p-6 border-4 border-black shadow-brutal-spooky">
            <h3 className="font-black uppercase mb-2 italic underline decoration-ghost-accent decoration-4">📜 Grimoire</h3>
            <ul className="text-sm font-bold space-y-1">
              <li><span className="text-ghost-accent">ls</span> - peer into void</li>
              <li><span className="text-ghost-accent">whoami</span> - query soul</li>
              <li><span className="text-ghost-accent">git status</span> - check sins</li>
            </ul>
          </div>
          
          <div className="bg-ghost-accent text-white p-6 border-4 border-black shadow-brutal-white">
            <h3 className="font-black uppercase mb-2 italic underline decoration-white decoration-4">💡 Ritual</h3>
            <p className="text-sm font-bold leading-tight">GhostShell turns shell execution into an open-source AI séance powered by Gemma.</p>
          </div>

          <div className="bg-ghost-spooky text-black p-6 border-4 border-black shadow-brutal">
            <h3 className="font-black uppercase mb-2 italic underline decoration-black decoration-4">🌟 Soul</h3>
            <p className="text-sm font-bold leading-tight">Local AI sovereignty. Your data stays in the grave (your laptop).</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t-4 border-black pt-8">
          <div className="font-black uppercase tracking-widest text-sm text-white bg-black px-2">
            GhostShell Protocol // 2026
          </div>
          <div className="flex gap-8 font-bold text-xs uppercase text-white">
            <a href="https://github.com" className="hover:text-ghost-accent underline decoration-2">Source</a>
            <Link to="/manifesto" className="hover:text-ghost-accent underline decoration-2">Manifesto</Link>
            <Link to="/gemma-docs" className="hover:text-ghost-accent underline decoration-2">Gemma Protocol</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainTerminal;
