import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_PROGRESS, ProgressState, QuizAttempt } from '../types';
import { ACHIEVEMENTS } from '../data/achievements';
import { LESSONS } from '../data/lessons';
import { MODULES } from '../data/modules';
import { countCompletedModules, evaluateAchievements, touchStreak, XP } from '../utils/gamification';

const STORAGE_KEY = 'web3academy.progress.v1';

const LESSON_IDS_BY_MODULE: Record<string, string[]> = MODULES.reduce((acc, m) => {
  acc[m.id] = LESSONS.filter((l) => l.moduleId === m.id).map((l) => l.id);
  return acc;
}, {} as Record<string, string[]>);

interface ProgressContextValue {
  progress: ProgressState;
  isLoaded: boolean;
  newlyUnlocked: string[];
  clearNewlyUnlocked: () => void;
  completeOnboarding: () => void;
  toggleTermMastered: (id: string) => void;
  completeLesson: (id: string) => void;
  isLessonCompleted: (id: string) => boolean;
  viewChain: (id: string) => void;
  recordQuizAttempt: (quizId: string, score: number, total: number) => void;
  setDarkModeOverride: (mode: ProgressState['darkModeOverride']) => void;
  resetProgress: () => void;
  completedModulesCount: number;
  lessonIdsByModule: Record<string, string[]>;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressState>(DEFAULT_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([]);
  const hydrated = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setProgress({ ...DEFAULT_PROGRESS, ...parsed });
        }
      } catch {
        // corrupt storage, fall back to defaults
      } finally {
        hydrated.current = true;
        setIsLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress)).catch(() => {});
  }, [progress]);

  const applyUpdate = useCallback((updater: (prev: ProgressState) => ProgressState) => {
    setProgress((prev) => {
      const withStreak = { ...prev, ...touchStreak(prev) };
      const next = updater(withStreak);
      const earned = evaluateAchievements(next, ACHIEVEMENTS, LESSON_IDS_BY_MODULE);
      const freshlyEarned = earned.filter((id) => !next.unlockedAchievementIds.includes(id));
      if (freshlyEarned.length > 0) {
        setNewlyUnlocked((cur) => [...cur, ...freshlyEarned]);
      }
      return { ...next, unlockedAchievementIds: earned };
    });
  }, []);

  const completeOnboarding = useCallback(() => {
    applyUpdate((prev) => ({ ...prev, hasOnboarded: true }));
  }, [applyUpdate]);

  const toggleTermMastered = useCallback(
    (id: string) => {
      applyUpdate((prev) => {
        const isMastered = prev.masteredTermIds.includes(id);
        const masteredTermIds = isMastered
          ? prev.masteredTermIds.filter((t) => t !== id)
          : [...prev.masteredTermIds, id];
        const xp = prev.xp + (isMastered ? -XP.TERM_MASTERED : XP.TERM_MASTERED);
        return { ...prev, masteredTermIds, xp: Math.max(0, xp) };
      });
    },
    [applyUpdate]
  );

  const completeLesson = useCallback(
    (id: string) => {
      applyUpdate((prev) => {
        if (prev.completedLessonIds.includes(id)) return prev;
        return {
          ...prev,
          completedLessonIds: [...prev.completedLessonIds, id],
          xp: prev.xp + XP.LESSON_COMPLETE,
        };
      });
    },
    [applyUpdate]
  );

  const isLessonCompleted = useCallback((id: string) => progress.completedLessonIds.includes(id), [progress]);

  const viewChain = useCallback(
    (id: string) => {
      applyUpdate((prev) => {
        if (prev.viewedChainIds.includes(id)) return prev;
        return { ...prev, viewedChainIds: [...prev.viewedChainIds, id], xp: prev.xp + XP.CHAIN_EXPLORED };
      });
    },
    [applyUpdate]
  );

  const recordQuizAttempt = useCallback(
    (quizId: string, score: number, total: number) => {
      applyUpdate((prev) => {
        const attempt: QuizAttempt = { quizId, score, total, completedAt: new Date().toISOString() };
        const bonus = score === total ? XP.QUIZ_PERFECT_BONUS : 0;
        return {
          ...prev,
          quizAttempts: [...prev.quizAttempts, attempt],
          xp: prev.xp + score * XP.QUIZ_CORRECT_ANSWER + bonus,
        };
      });
    },
    [applyUpdate]
  );

  const setDarkModeOverride = useCallback((mode: ProgressState['darkModeOverride']) => {
    setProgress((prev) => ({ ...prev, darkModeOverride: mode }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({ ...DEFAULT_PROGRESS, hasOnboarded: true });
  }, []);

  const clearNewlyUnlocked = useCallback(() => setNewlyUnlocked([]), []);

  const completedModulesCount = useMemo(() => countCompletedModules(progress, LESSON_IDS_BY_MODULE), [progress]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      isLoaded,
      newlyUnlocked,
      clearNewlyUnlocked,
      completeOnboarding,
      toggleTermMastered,
      completeLesson,
      isLessonCompleted,
      viewChain,
      recordQuizAttempt,
      setDarkModeOverride,
      resetProgress,
      completedModulesCount,
      lessonIdsByModule: LESSON_IDS_BY_MODULE,
    }),
    [
      progress,
      isLoaded,
      newlyUnlocked,
      clearNewlyUnlocked,
      completeOnboarding,
      toggleTermMastered,
      completeLesson,
      isLessonCompleted,
      viewChain,
      recordQuizAttempt,
      setDarkModeOverride,
      resetProgress,
      completedModulesCount,
    ]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
