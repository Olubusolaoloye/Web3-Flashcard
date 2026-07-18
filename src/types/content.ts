// Shared content types for Web3 Academy.
// Data files in src/data/*.ts must conform to these shapes exactly.

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type GlossaryCategory =
  | 'Core Technology'
  | 'DeFi'
  | 'NFTs & Culture'
  | 'Security'
  | 'Governance'
  | 'Infrastructure'
  | 'Trading & Markets'
  | 'Compliance'
  | 'Economics'
  | 'Cryptography'
  | 'Wallets & Identity';

export interface GlossaryTerm {
  id: string; // kebab-case unique id, e.g. 'gas-fee'
  letter: string; // single uppercase letter this term is filed under
  term: string;
  pronunciation?: string; // optional simple phonetic hint
  definition: string; // 1-2 sentences, plain language
  example: string; // concrete real-world example
  category: GlossaryCategory;
  difficulty: Difficulty;
  relatedIds?: string[]; // ids of related GlossaryTerm entries
}

export interface Lesson {
  id: string; // unique, e.g. 'foundations-1'
  moduleId: string;
  order: number; // order within module, starting at 1
  title: string;
  icon: string; // single emoji
  summary: string; // one-line teaser shown in lists
  content: string[]; // paragraphs of lesson body copy
  keyTakeaway: string;
  checkQuestion: {
    // a single inline comprehension check shown at the end of the lesson
    prompt: string;
    options: string[];
    correctIndex: number;
  };
}

export interface Module {
  id: string; // unique, e.g. 'foundations'
  order: number;
  title: string;
  description: string;
  icon: string; // single emoji
  color: string; // hex accent color for this module
  estimatedMinutes: number;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string; // shown after answering, reinforces the concept
}

export interface ModuleQuiz {
  id: string; // e.g. 'quiz-foundations'
  moduleId: string;
  title: string;
  questions: QuizQuestion[];
}

export type DAppCategory =
  | 'DEX'
  | 'NFT'
  | 'Lending'
  | 'Gaming'
  | 'Infrastructure'
  | 'Wallets'
  | 'Social'
  | 'Liquid Staking'
  | 'Yield'
  | 'Perpetuals'
  | 'Bridge'
  | 'Payments'
  | 'Stablecoin'
  | 'Oracle'
  | 'Launchpad';

export interface DApp {
  name: string;
  category: DAppCategory;
  use: string;
  explanation: string;
  link: string;
}

export type ChainType = 'Layer 1' | 'Layer 2' | 'Sidechain';

export interface Blockchain {
  id: string;
  name: string;
  logo: string; // single emoji
  tagline: string; // short punchy description
  overview: string;
  chainType: ChainType;
  consensus: string;
  nativeToken: string;
  launched: number; // year
  strengths: string[];
  useCases: string[];
  dApps: DApp[];
}

export type AchievementCriteria =
  | { type: 'lessonsCompleted'; count: number }
  | { type: 'modulesCompleted'; count: number }
  | { type: 'termsMastered'; count: number }
  | { type: 'chainsExplored'; count: number }
  | { type: 'quizzesPerfect'; count: number }
  | { type: 'streakDays'; count: number }
  | { type: 'allModulesCompleted' };

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // single emoji
  criteria: AchievementCriteria;
}
