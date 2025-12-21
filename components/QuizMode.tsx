
import React, { useState, useEffect } from 'react';
import { Web3Card } from '../types';
import { WEB3_GLOSSARY } from '../data';

const QuizMode: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [questions, setQuestions] = useState<{
    card: Web3Card;
    options: string[];
    correctIndex: number;
  }[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    generateQuiz();
  }, []);

  const generateQuiz = () => {
    // Shuffle glossary and pick 5 random terms
    const shuffled = [...WEB3_GLOSSARY].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    const quizQuestions = selected.map(card => {
      // Find 3 other random terms for distractor options
      const distractors = WEB3_GLOSSARY
        .filter(c => c.id !== card.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(c => c.term);

      const options = [...distractors, card.term].sort(() => 0.5 - Math.random());
      const correctIndex = options.indexOf(card.term);

      return {
        card,
        options,
        correctIndex
      };
    });

    setQuestions(quizQuestions);
    setScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correctIndex) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(q => q + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1200);
  };

  if (questions.length === 0) return null;

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-300">
        <div className="text-6xl mb-6">
          {score === questions.length ? '🏆' : '🔥'}
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Quiz Complete!</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          You got <span className="text-web3-primary font-bold">{score}</span> out of <span className="font-bold">{questions.length}</span> correct.
        </p>
        <button 
          onClick={generateQuiz}
          className="w-full bg-web3-primary hover:bg-web3-secondary text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-web3-primary/25"
        >
          Try Again
        </button>
      </div>
    );
  }

  const current = questions[currentQuestion];

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-xs font-bold text-web3-primary uppercase tracking-widest">Score: {score}</span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-web3-primary transition-all duration-500" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 mb-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white leading-relaxed">
          {current.card.definition}
        </h3>
      </div>

      <div className="space-y-3">
        {current.options.map((option, idx) => {
          let bgColor = 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300';
          let borderColor = 'border-transparent';

          if (selectedAnswer !== null) {
            if (idx === current.correctIndex) {
              bgColor = 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400';
              borderColor = 'border-green-500';
            } else if (idx === selectedAnswer) {
              bgColor = 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400';
              borderColor = 'border-red-500';
            } else {
              bgColor = 'bg-slate-50 dark:bg-slate-800 opacity-50 text-slate-400';
            }
          }

          return (
            <button
              key={idx}
              disabled={selectedAnswer !== null}
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left p-5 rounded-2xl font-semibold border-2 transition-all ${bgColor} ${borderColor}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizMode;
