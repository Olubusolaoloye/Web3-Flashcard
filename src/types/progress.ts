export interface QuizAttempt {
  quizId: string;
  score: number;
  total: number;
  completedAt: string; // ISO date
}

export interface ProgressState {
  hasOnboarded: boolean;
  xp: number;
  masteredTermIds: string[];
  completedLessonIds: string[];
  viewedChainIds: string[];
  quizAttempts: QuizAttempt[];
  unlockedAchievementIds: string[];
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null; // ISO date (yyyy-mm-dd)
  darkModeOverride: 'light' | 'dark' | 'system';
}

export const DEFAULT_PROGRESS: ProgressState = {
  hasOnboarded: false,
  xp: 0,
  masteredTermIds: [],
  completedLessonIds: [],
  viewedChainIds: [],
  quizAttempts: [],
  unlockedAchievementIds: [],
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  darkModeOverride: 'system',
};
