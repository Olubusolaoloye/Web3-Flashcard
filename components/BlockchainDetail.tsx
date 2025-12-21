
import React, { useState } from 'react';
import { Blockchain, DApp } from '../types';

interface BlockchainDetailProps {
  chain: Blockchain;
  onBack: () => void;
}

const BlockchainDetail: React.FC<BlockchainDetailProps> = ({ chain, onBack }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(chain.dApps.map(d => d.category)));

  const filteredDApps = activeCategory 
    ? chain.dApps.filter(d => d.category === activeCategory)
    : chain.dApps;

  return (
    <div className="w-full max-w-md px-4 animate-in fade-in slide-in-from-right-4 duration-500 pb-24">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="flex items-center space-x-2">
           <span className="text-2xl">{chain.logo}</span>
           <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{chain.name}</h2>
        </div>
        <div className="w-8"></div>
      </div>

      <section className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
        <h3 className="text-xs font-bold text-web3-primary uppercase tracking-widest mb-2">Overview</h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-6">
          {chain.overview}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Strengths</h4>
            <div className="flex flex-wrap gap-1">
              {chain.strengths.map((s, idx) => (
                <span key={idx} className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] px-2 py-1 rounded-md">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Use Cases</h4>
            <div className="flex flex-wrap gap-1">
              {chain.useCases.map((u, idx) => (
                <span key={idx} className="bg-web3-primary/10 text-web3-primary text-[10px] px-2 py-1 rounded-md">
                  {u}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Popular dApps</h3>
          <span className="text-xs text-slate-400">{chain.dApps.length} Apps</span>
        </div>

        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
           <button 
             onClick={() => setActiveCategory(null)}
             className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${!activeCategory ? 'bg-web3-primary text-white shadow-lg shadow-web3-primary/20' : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'}`}
           >
             All
           </button>
           {categories.map(cat => (
             <button 
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-web3-primary text-white shadow-lg shadow-web3-primary/20' : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'}`}
             >
               {cat}
             </button>
           ))}
        </div>

        <div className="space-y-3">
          {filteredDApps.map((dapp, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm transition-all">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{dapp.name}</h4>
                  <span className="text-[10px] font-bold text-web3-primary uppercase tracking-widest">{dapp.category}</span>
                </div>
                <a 
                  href={dapp.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-50 dark:bg-slate-700 rounded-xl text-web3-primary hover:bg-web3-primary hover:text-white transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mb-3">
                <span className="text-slate-400 dark:text-slate-500 mr-1 uppercase text-[9px]">Used for:</span> {dapp.use}
              </p>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                  {dapp.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlockchainDetail;
