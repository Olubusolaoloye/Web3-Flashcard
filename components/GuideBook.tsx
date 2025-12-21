
import React, { useState, useRef, useEffect } from 'react';
import { WEB3_GUIDE_LESSONS } from '../guideData';

interface GuideBookProps {
  completedIds: number[];
  onComplete: (id: number) => void;
}

const GuideBook: React.FC<GuideBookProps> = ({ completedIds, onComplete }) => {
  const [activeLesson, setActiveLesson] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const lesson = WEB3_GUIDE_LESSONS[activeLesson];

  // Auto-scroll the lesson list to keep active lesson in view
  useEffect(() => {
    if (scrollRef.current) {
      const activeBtn = scrollRef.current.children[activeLesson] as HTMLElement;
      if (activeBtn) {
        scrollRef.current.scrollTo({
          left: activeBtn.offsetLeft - (scrollRef.current.offsetWidth / 2) + (activeBtn.offsetWidth / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [activeLesson]);

  return (
    <div className="w-full max-w-md px-4 pb-24">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Master Web3</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Foundations to Success</p>
        </div>
        <div className="text-right">
          <span className="bg-web3-primary/10 text-web3-primary text-[10px] font-black px-3 py-1 rounded-full border border-web3-primary/20 block">
            {activeLesson + 1} / 40
          </span>
          <p className="text-[10px] text-slate-400 font-bold mt-1">{completedIds.length} COMPLETED</p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="mb-8 overflow-x-auto no-scrollbar flex space-x-2 pb-4 pt-1"
      >
        {WEB3_GUIDE_LESSONS.map((l, idx) => (
          <button
            key={l.id}
            onClick={() => setActiveLesson(idx)}
            className={`flex-shrink-0 w-11 h-11 rounded-xl font-black transition-all border-2 text-sm relative ${
              activeLesson === idx 
                ? 'bg-web3-primary border-web3-primary text-white shadow-lg shadow-web3-primary/30 scale-110 z-10' 
                : completedIds.includes(l.id)
                  ? 'bg-green-500/10 border-green-500 text-green-500'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
            }`}
          >
            {l.id}
            {completedIds.includes(l.id) && activeLesson !== idx && (
              <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
        {/* Progress bar inside card */}
        <div className="absolute top-0 left-0 h-1 bg-web3-primary/10 w-full">
           <div 
             className="h-full bg-web3-primary transition-all duration-500"
             style={{ width: `${((activeLesson + 1) / 40) * 100}%` }}
           />
        </div>

        <div className="flex items-center space-x-4 mb-8">
          <span className="text-4xl bg-slate-50 dark:bg-slate-900 p-4 rounded-3xl shadow-inner">{lesson.icon}</span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">{lesson.title}</h3>
        </div>

        <div className="space-y-8">
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-medium">
            {lesson.content}
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/50 border-l-4 border-web3-primary p-6 rounded-r-2xl shadow-sm">
            <span className="text-[10px] font-black text-web3-primary uppercase tracking-widest block mb-2 opacity-80">Golden Rule</span>
            <p className="text-slate-900 dark:text-white font-bold italic text-lg leading-tight">
              "{lesson.keyTakeaway}"
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            onComplete(lesson.id);
            if (activeLesson < WEB3_GUIDE_LESSONS.length - 1) {
              setTimeout(() => setActiveLesson(activeLesson + 1), 600);
            }
          }}
          className={`w-full mt-10 py-5 px-6 rounded-2xl font-black transition-all flex items-center justify-center space-x-3 uppercase tracking-widest text-sm ${
            completedIds.includes(lesson.id)
              ? 'bg-green-500 text-white shadow-xl shadow-green-500/30'
              : 'bg-web3-primary text-white shadow-xl shadow-web3-primary/30 hover:scale-[1.02] active:scale-95'
          }`}
        >
          <span>{completedIds.includes(lesson.id) ? 'Learned' : 'Commit to memory'}</span>
          {completedIds.includes(lesson.id) ? (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
             </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <button
          disabled={activeLesson === 0}
          onClick={() => setActiveLesson(activeLesson - 1)}
          className="flex items-center justify-center space-x-2 py-4 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-30 shadow-sm transition-all active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-black uppercase tracking-widest">Back</span>
        </button>
        <button
          disabled={activeLesson === WEB3_GUIDE_LESSONS.length - 1}
          onClick={() => setActiveLesson(activeLesson + 1)}
          className="flex items-center justify-center space-x-2 py-4 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-30 shadow-sm transition-all active:scale-95"
        >
          <span className="text-xs font-black uppercase tracking-widest">Forward</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GuideBook;
