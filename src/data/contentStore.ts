import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import { Achievement, Blockchain, GlossaryTerm, Lesson, Module, ModuleQuiz } from '../types';
import { ACHIEVEMENTS as STATIC_ACHIEVEMENTS } from './achievements';
import { BLOCKCHAINS as STATIC_BLOCKCHAINS } from './blockchains';
import { GLOSSARY as STATIC_GLOSSARY } from './glossary';
import { LESSONS as STATIC_LESSONS } from './lessons';
import { MODULES as STATIC_MODULES } from './modules';
import { MODULE_QUIZZES as STATIC_MODULE_QUIZZES } from './quizzes';

const CACHE_KEY = 'web3academy.content.v1';

export interface ContentBundle {
  modules: Module[];
  lessons: Lesson[];
  glossary: GlossaryTerm[];
  blockchains: Blockchain[];
  achievements: Achievement[];
  quizzes: ModuleQuiz[];
}

/** The content bundled into the app binary. Used for the very first paint (before any
 * cache or network read resolves) and as a last-resort fallback if a device has never
 * been able to reach Supabase. */
export function getBundledContent(): ContentBundle {
  return {
    modules: STATIC_MODULES,
    lessons: STATIC_LESSONS,
    glossary: STATIC_GLOSSARY,
    blockchains: STATIC_BLOCKCHAINS,
    achievements: STATIC_ACHIEVEMENTS,
    quizzes: STATIC_MODULE_QUIZZES,
  };
}

export async function loadCachedContent(): Promise<ContentBundle | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as ContentBundle) : null;
  } catch {
    return null;
  }
}

async function saveCachedContent(bundle: ContentBundle): Promise<void> {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(bundle));
  } catch {
    // best-effort cache; a failed write just means we re-fetch next launch
  }
}

function mapModule(row: any): Module {
  return {
    id: row.id,
    order: row.sort_order,
    title: row.title,
    description: row.description,
    icon: row.icon,
    color: row.color,
    estimatedMinutes: row.estimated_minutes,
  };
}

function mapLesson(row: any): Lesson {
  return {
    id: row.id,
    moduleId: row.module_id,
    order: row.sort_order,
    title: row.title,
    icon: row.icon,
    summary: row.summary,
    content: row.content,
    keyTakeaway: row.key_takeaway,
    checkQuestion: row.check_question,
  };
}

function mapGlossaryTerm(row: any): GlossaryTerm {
  return {
    id: row.id,
    letter: row.letter,
    term: row.term,
    pronunciation: row.pronunciation ?? undefined,
    definition: row.definition,
    example: row.example,
    category: row.category,
    difficulty: row.difficulty,
    relatedIds: row.related_ids ?? [],
  };
}

function mapBlockchain(row: any): Blockchain {
  return {
    id: row.id,
    name: row.name,
    logo: row.logo,
    tagline: row.tagline,
    overview: row.overview,
    chainType: row.chain_type,
    consensus: row.consensus,
    nativeToken: row.native_token,
    launched: row.launched,
    strengths: row.strengths,
    useCases: row.use_cases,
    dApps: row.dapps,
  };
}

function mapAchievement(row: any): Achievement {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    icon: row.icon,
    criteria: row.criteria,
  };
}

function mapModuleQuiz(row: any): ModuleQuiz {
  return {
    id: row.id,
    moduleId: row.module_id,
    title: row.title,
    questions: row.questions,
  };
}

/** Fetches the live content from Supabase. Throws if any table fails, so callers can
 * fall back to cached or bundled content instead of showing a partially-updated app. */
export async function fetchRemoteContent(): Promise<ContentBundle> {
  const [modules, lessons, glossary, blockchains, achievements, quizzes] = await Promise.all([
    supabase.from('modules').select('*').order('sort_order'),
    supabase.from('lessons').select('*').order('sort_order'),
    supabase.from('glossary_terms').select('*').order('term'),
    supabase.from('blockchains').select('*').order('name'),
    supabase.from('achievements').select('*'),
    supabase.from('module_quizzes').select('*'),
  ]);

  for (const res of [modules, lessons, glossary, blockchains, achievements, quizzes]) {
    if (res.error) throw res.error;
  }

  const bundle: ContentBundle = {
    modules: (modules.data ?? []).map(mapModule),
    lessons: (lessons.data ?? []).map(mapLesson),
    glossary: (glossary.data ?? []).map(mapGlossaryTerm),
    blockchains: (blockchains.data ?? []).map(mapBlockchain),
    achievements: (achievements.data ?? []).map(mapAchievement),
    quizzes: (quizzes.data ?? []).map(mapModuleQuiz),
  };

  await saveCachedContent(bundle);
  return bundle;
}
