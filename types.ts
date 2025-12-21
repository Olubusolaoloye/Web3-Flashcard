
export interface Web3Card {
  id: string;
  letter: string;
  term: string;
  definition: string;
  example: string;
  category: string;
}

export interface DApp {
  name: string;
  category: 'DEX' | 'NFT' | 'Lending' | 'Gaming' | 'Infrastructure' | 'Wallets' | 'Social' | 'Liquid Staking' | 'Yield' | 'Perpetuals' | 'Bridge';
  use: string;
  explanation: string;
  link: string;
}

export interface Blockchain {
  id: string;
  name: string;
  logo: string;
  description: string;
  overview: string;
  strengths: string[];
  useCases: string[];
  dApps: DApp[];
}

export interface Lesson {
  id: number;
  title: string;
  content: string;
  keyTakeaway: string;
  icon: string;
}

export type AppView = 'home' | 'cards' | 'quiz' | 'categories' | 'library' | 'blockchain-detail' | 'guide';

export interface ProgressState {
  masteredIds: string[];
  lastVisitedId: string | null;
  completedLessonIds: number[];
}
