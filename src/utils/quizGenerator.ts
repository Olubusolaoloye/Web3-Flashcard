import { GLOSSARY } from '../data/glossary';
import { GlossaryTerm, QuizQuestion } from '../types';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => 0.5 - Math.random());
}

/** Builds a fresh quiz from a glossary term pool: given the definition, pick the matching term.
 * Distractor options are always drawn from the full glossary so there are enough to choose from
 * even when quizzing a small deck. */
export function generateTermQuiz(pool: GlossaryTerm[], count = 8, idPrefix = 'quiz'): QuizQuestion[] {
  const questionCards = shuffle(pool).slice(0, Math.min(count, pool.length));
  return questionCards.map((card, idx) => {
    const distractors = shuffle(GLOSSARY.filter((c) => c.id !== card.id))
      .slice(0, 3)
      .map((c) => c.term);
    const options = shuffle([...distractors, card.term]);
    const correctIndex = options.indexOf(card.term);
    return {
      id: `${idPrefix}-${idx}-${card.id}`,
      prompt: card.definition,
      options,
      correctIndex,
      explanation: `${card.term} — ${card.example}`,
    };
  });
}

export function generateGlossaryQuiz(count = 8): QuizQuestion[] {
  return generateTermQuiz(GLOSSARY, count, 'daily');
}
