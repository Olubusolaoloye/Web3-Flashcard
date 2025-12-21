
import React, { useState, useEffect, useMemo } from 'react';
import { AppView, ProgressState, Blockchain } from './types';
import { WEB3_GLOSSARY } from './data';
import Flashcard from './components/Flashcard';
import QuizMode from './components/QuizMode';
import LibraryView from './components/LibraryView';
import BlockchainDetail from './components/BlockchainDetail';
import GuideBook from './components/GuideBook';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBlockchain, setSelectedBlockchain] = useState<Blockchain | null>(null);
  const [progress, setProgress] = useState<ProgressState>(() => {
    const saved = localStorage.getItem('web3-flashcards-progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        masteredIds: parsed.masteredIds || [],
        lastVisitedId: parsed.lastVisitedId || null,
        completedLessonIds: parsed.completedLessonIds || []
      };
    }
    return { masteredIds: [], lastVisitedId: null, completedLessonIds: [] };
  });

  useEffect(() => {
    localStorage.setItem('web3-flashcards-progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleMastered = (id: string) => {
    setProgress(prev => {
      const isMastered = prev.masteredIds.includes(id);
      const newMastered = isMastered 
        ? prev.masteredIds.filter(mid => mid !== id)
        : [...prev.masteredIds, id];
      return { ...prev, masteredIds: newMastered };
    });
  };

  const markLessonComplete = (id: number) => {
    setProgress(prev => {
      if (prev.completedLessonIds.includes(id)) return prev;
      return { ...prev, completedLessonIds: [...prev.completedLessonIds, id] };
    });
  };

  const masteryPercentage = Math.round((progress.masteredIds.length / WEB3_GLOSSARY.length) * 100);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % WEB3_GLOSSARY.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + WEB3_GLOSSARY.length) % WEB3_GLOSSARY.length);
  };

  const navigateToBlockchain = (chain: Blockchain) => {
    setSelectedBlockchain(chain);
    setView('blockchain-detail');
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-web3-primary to-web3-secondary rounded-full blur opacity-25"></div>
              <div className="relative bg-white dark:bg-slate-800 p-8 rounded-full shadow-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-web3-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                Web3 <span className="text-web3-primary">Explorer</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto text-lg font-medium leading-tight">
                Your simplified roadmap to the decentralized universe.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm px-4">
              <button 
                onClick={() => setView('guide')}
                className="col-span-2 bg-web3-primary hover:bg-web3-secondary text-white font-black py-5 px-6 rounded-3xl transition-all shadow-xl shadow-web3-primary/20 flex items-center justify-center space-x-3 group uppercase tracking-widest text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Complete 40 Lessons</span>
              </button>
              
              <button 
                onClick={() => setView('library')}
                className="col-span-2 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-lg flex items-center justify-center space-x-2 uppercase tracking-widest text-[10px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-web3-secondary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 2a1 1 0 011 1v15a1 1 0 11-2 0V3a1 1 0 011-1zM3 3a1 1 0 011-1h1a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1H4zm11 1a1 1 0 011-1h1a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1h-1z" clipRule="evenodd" />
                </svg>
                <span>Ecosystem Index</span>
              </button>
              
              <button 
                onClick={() => setView('cards')}
                className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-black py-4 px-4 rounded-2xl transition-all shadow-lg border border-slate-200 dark:border-slate-700 uppercase tracking-widest text-[10px]"
              >
                Flash Cards
              </button>
              
              <button 
                onClick={() => setView('quiz')}
                className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-black py-4 px-4 rounded-2xl transition-all shadow-lg border border-slate-200 dark:border-slate-700 uppercase tracking-widest text-[10px]"
              >
                Take Quiz
              </button>
            </div>

            <div className="w-full max-w-xs pt-8">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Card Mastery</span>
                <span className="text-2xl font-black text-web3-primary">{masteryPercentage}%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-web3-primary to-web3-secondary transition-all duration-1000" 
                  style={{ width: `${masteryPercentage}%` }}
                />
              </div>
            </div>
          </div>
        );
      case 'guide':
        return (
          <GuideBook 
            completedIds={progress.completedLessonIds} 
            onComplete={markLessonComplete} 
          />
        );
      case 'cards':
        return (
          <div className="flex flex-col items-center space-y-8 w-full animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between w-full max-w-sm px-4 items-center mb-2">
              <button 
                onClick={() => setView('home')} 
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {currentIndex + 1} / {WEB3_GLOSSARY.length}
              </div>
              <div className="w-10 h-10"></div>
            </div>

            <Flashcard 
              card={WEB3_GLOSSARY[currentIndex]} 
              isMastered={progress.masteredIds.includes(WEB3_GLOSSARY[currentIndex].id)}
              onMastered={() => toggleMastered(WEB3_GLOSSARY[currentIndex].id)}
            />

            <div className="flex space-x-6 w-full max-w-xs justify-center pt-4">
              <button 
                onClick={prevCard}
                className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg text-slate-600 dark:text-slate-400 hover:text-web3-primary dark:hover:text-web3-primary transition-all border border-slate-200 dark:border-slate-700 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextCard}
                className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg text-slate-600 dark:text-slate-400 hover:text-web3-primary dark:hover:text-web3-primary transition-all border border-slate-200 dark:border-slate-700 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        );
      case 'categories':
        return (
          <div className="w-full max-w-md px-4 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => setView('home')} className="p-2 text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">A to Z Index</h2>
              <div className="w-10 h-10"></div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {WEB3_GLOSSARY.map((card, idx) => {
                const isMastered = progress.masteredIds.includes(card.id);
                return (
                  <button 
                    key={card.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setView('cards');
                    }}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all active:scale-[0.98] ${
                      isMastered 
                        ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' 
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-lg ${isMastered ? 'bg-green-500 text-white' : 'bg-web3-primary/10 text-web3-primary'}`}>
                        {card.letter}
                      </span>
                      <div className="text-left">
                        <p className={`font-bold ${isMastered ? 'text-green-700 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}>{card.term}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">{card.category}</p>
                      </div>
                    </div>
                    {isMastered && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      case 'quiz':
        return (
          <div className="flex flex-col items-center w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between w-full max-w-sm px-4 items-center mb-8">
              <button onClick={() => setView('home')} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Knowledge Test</h2>
              <div className="w-10"></div>
            </div>
            <QuizMode />
          </div>
        );
      case 'library':
        return (
          <LibraryView onSelectBlockchain={navigateToBlockchain} />
        );
      case 'blockchain-detail':
        return selectedBlockchain ? (
          <BlockchainDetail 
            chain={selectedBlockchain} 
            onBack={() => setView('library')} 
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white pb-24 pt-8 flex flex-col items-center overflow-x-hidden transition-colors duration-500">
      {/* Settings/Toggle Area */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-2xl border border-slate-200 dark:border-slate-700 transition-all hover:scale-110 active:scale-90"
        >
          {darkMode ? (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
               <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
             </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>

      <main className="container mx-auto max-w-lg flex flex-col items-center">
        {renderContent()}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-2 py-4 z-40">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button 
            onClick={() => setView('home')}
            className={`flex flex-col items-center p-1 transition-all active:scale-90 ${view === 'home' ? 'text-web3-primary scale-110' : 'text-slate-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[8px] font-black mt-1 uppercase text-center tracking-tighter">Home</span>
          </button>
          <button 
            onClick={() => setView('guide')}
            className={`flex flex-col items-center p-1 transition-all active:scale-90 ${view === 'guide' ? 'text-web3-primary scale-110' : 'text-slate-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-[8px] font-black mt-1 uppercase text-center tracking-tighter">Guide</span>
          </button>
          <button 
            onClick={() => setView('library')}
            className={`flex flex-col items-center p-1 transition-all active:scale-90 ${view === 'library' || view === 'blockchain-detail' ? 'text-web3-primary scale-110' : 'text-slate-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-[8px] font-black mt-1 uppercase text-center tracking-tighter">Wiki</span>
          </button>
          <button 
            onClick={() => setView('cards')}
            className={`flex flex-col items-center p-1 transition-all active:scale-90 ${view === 'cards' ? 'text-web3-primary scale-110' : 'text-slate-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 12h10M7 17h10" />
            </svg>
            <span className="text-[8px] font-black mt-1 uppercase text-center tracking-tighter">Flash</span>
          </button>
          <button 
            onClick={() => setView('quiz')}
            className={`flex flex-col items-center p-1 transition-all active:scale-90 ${view === 'quiz' ? 'text-web3-primary scale-110' : 'text-slate-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-[8px] font-black mt-1 uppercase text-center tracking-tighter">Quiz</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
