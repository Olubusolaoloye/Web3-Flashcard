import { Achievement, ProgressState } from '../types';

export const XP = {
  LESSON_COMPLETE: 15,
  TERM_MASTERED: 4,
  QUIZ_CORRECT_ANSWER: 6,
  QUIZ_PERFECT_BONUS: 25,
  CHAIN_EXPLORED: 5,
};

const XP_PER_LEVEL = 150;

export const LEVEL_TITLES = [
  'Newcomer',
  'Explorer',
  'Builder',
  'Analyst',
  'Strategist',
  'Architect',
  'Web3 Native',
  'Protocol Master',
  'Chain Sage',
  'Web3 Legend',
];

export function getLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function getLevelTitle(xp: number): string {
  const level = getLevel(xp);
  return LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];
}

export function getLevelProgress(xp: number): {
  level: number;
  title: string;
  xpIntoLevel: number;
  xpForNextLevel: number;
  fraction: number;
} {
  const level = getLevel(xp);
  const xpIntoLevel = xp - (level - 1) * XP_PER_LEVEL;
  return {
    level,
    title: getLevelTitle(xp),
    xpIntoLevel,
    xpForNextLevel: XP_PER_LEVEL,
    fraction: Math.min(1, xpIntoLevel / XP_PER_LEVEL),
  };
}

const todayIso = () => new Date().toISOString().slice(0, 10);

function daysBetween(a: string, b: string): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((new Date(b + 'T00:00:00Z').getTime() - new Date(a + 'T00:00:00Z').getTime()) / msPerDay);
}

/** Returns updated streak fields; safe to call multiple times per day (idempotent). */
export function touchStreak(
  progress: ProgressState
): Pick<ProgressState, 'currentStreak' | 'longestStreak' | 'lastActiveDate'> {
  const today = todayIso();
  if (progress.lastActiveDate === today) {
    return { currentStreak: progress.currentStreak, longestStreak: progress.longestStreak, lastActiveDate: today };
  }
  let currentStreak = 1;
  if (progress.lastActiveDate && daysBetween(progress.lastActiveDate, today) === 1) {
    currentStreak = progress.currentStreak + 1;
  }
  const longestStreak = Math.max(progress.longestStreak, currentStreak);
  return { currentStreak, longestStreak, lastActiveDate: today };
}

/** module id -> ordered list of lesson ids belonging to it. Populate once from src/data at app start. */
export function countCompletedModules(progress: ProgressState, lessonIdsByModule: Record<string, string[]>): number {
  const completed = new Set(progress.completedLessonIds);
  let count = 0;
  for (const lessonIds of Object.values(lessonIdsByModule)) {
    if (lessonIds.length > 0 && lessonIds.every((id) => completed.has(id))) {
      count++;
    }
  }
  return count;
}

export function evaluateAchievements(
  progress: ProgressState,
  achievements: Achievement[],
  lessonIdsByModule: Record<string, string[]>
): string[] {
  const earned: string[] = [];
  const totalModules = Object.keys(lessonIdsByModule).length;
  const completedModules = countCompletedModules(progress, lessonIdsByModule);
  for (const achievement of achievements) {
    const c = achievement.criteria;
    let met = false;
    switch (c.type) {
      case 'lessonsCompleted':
        met = progress.completedLessonIds.length >= c.count;
        break;
      case 'modulesCompleted':
        met = completedModules >= c.count;
        break;
      case 'termsMastered':
        met = progress.masteredTermIds.length >= c.count;
        break;
      case 'chainsExplored':
        met = progress.viewedChainIds.length >= c.count;
        break;
      case 'quizzesPerfect':
        met = progress.quizAttempts.filter((a) => a.score === a.total).length >= c.count;
        break;
      case 'streakDays':
        met = progress.longestStreak >= c.count;
        break;
      case 'allModulesCompleted':
        met = totalModules > 0 && completedModules >= totalModules;
        break;
    }
    if (met) earned.push(achievement.id);
  }
  return earned;
}
