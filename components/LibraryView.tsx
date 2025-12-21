
import React, { useState, useMemo } from 'react';
import { BLOCKCHAIN_LIBRARY } from '../libraryData';
import { Blockchain } from '../types';

interface LibraryViewProps {
  onSelectBlockchain: (chain: Blockchain) => void;
}

const LibraryView: React.FC<LibraryViewProps> = ({ onSelectBlockchain }) => {
  const [search, setSearch] = useState('');

  const filteredChains = useMemo(() => {
    return BLOCKCHAIN_LIBRARY.filter(chain => 
      chain.name.toLowerCase().includes(search.toLowerCase()) ||
      chain.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="w-full max-w-md px-4 space-y-6">
      <div className="sticky top-0 pt-4 bg-slate-50 dark:bg-slate-900 z-10 pb-4">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">Knowledge Library</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search blockchains or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-web3-primary outline-none transition-all shadow-sm"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 pb-24">
        {filteredChains.map((chain) => (
          <button
            key={chain.id}
            onClick={() => onSelectBlockchain(chain)}
            className="group relative flex flex-col items-start p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="text-8xl">{chain.logo}</span>
            </div>
            
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl bg-slate-100 dark:bg-slate-700 p-2 rounded-2xl">{chain.logo}</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{chain.name}</h3>
            </div>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-[80%]">
              {chain.description}
            </p>
            
            <div className="mt-4 flex items-center text-web3-primary font-bold text-xs uppercase tracking-widest">
              Explore Ecosystem
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        ))}
        {filteredChains.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 italic">No blockchains found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryView;
