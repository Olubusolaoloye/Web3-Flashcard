
import React, { useState } from 'react';
import { Web3Card } from '../types';

interface FlashcardProps {
  card: Web3Card;
  onMastered?: () => void;
  isMastered?: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({ card, onMastered, isMastered }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-sm h-96 perspective-1000 group cursor-pointer" onClick={handleFlip}>
      <div 
        className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 flex flex-col justify-between border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-start">
             <span className="text-5xl font-black text-web3-primary opacity-20">{card.letter}</span>
             {isMastered && (
               <span className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full uppercase">
                 Mastered
               </span>
             )}
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{card.term}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-wide uppercase">{card.category}</p>
          </div>

          <div className="text-slate-400 dark:text-slate-500 text-xs">
            Tap to flip
          </div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-web3-primary to-web3-secondary rounded-3xl shadow-xl p-8 flex flex-col justify-between text-white">
          <div className="flex justify-between items-start">
             <span className="text-xl font-bold opacity-50">{card.term}</span>
             <button 
               onClick={(e) => {
                 e.stopPropagation();
                 onMastered?.();
               }}
               className={`p-2 rounded-full transition-colors ${
                 isMastered ? 'bg-white/40' : 'bg-white/20 hover:bg-white/30'
               }`}
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
               </svg>
             </button>
          </div>

          <div className="flex-1 flex flex-col justify-center overflow-y-auto no-scrollbar py-4">
            <p className="text-lg font-medium leading-relaxed mb-4">
              {card.definition}
            </p>
            <div className="bg-white/10 p-4 rounded-xl text-left border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider opacity-70 block mb-1">Example</span>
              <p className="text-sm italic opacity-90">{card.example}</p>
            </div>
          </div>

          <div className="text-white/60 text-xs">
            Tap to flip back
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
