// Module metadata for Web3 Academy.
// Each module groups a set of Lesson entries (see lessons.ts) under a shared theme.

import { Module } from '../types/content';

export const MODULES: Module[] = [
  {
    id: 'foundations',
    order: 1,
    title: 'Web3 Foundations',
    description: 'Understand what Web3 actually is and why owning your data and assets changes everything.',
    icon: '🌐',
    color: '#6366F1',
    estimatedMinutes: 20,
  },
  {
    id: 'blockchain-basics',
    order: 2,
    title: 'Blockchain Basics',
    description: 'Learn how blockchains actually work under the hood, from blocks to consensus to staking.',
    icon: '⛓️',
    color: '#22D3EE',
    estimatedMinutes: 24,
  },
  {
    id: 'smart-contracts',
    order: 3,
    title: 'Smart Contracts & DApps',
    description: 'See how self-executing code powers decentralized apps, and what keeps them safe and affordable.',
    icon: '📜',
    color: '#A855F7',
    estimatedMinutes: 20,
  },
  {
    id: 'major-chains',
    order: 4,
    title: 'Major Blockchains',
    description: 'Tour the biggest blockchain networks and learn what makes each design tradeoff unique.',
    icon: '💎',
    color: '#F59E0B',
    estimatedMinutes: 28,
  },
  {
    id: 'defi-nft-metaverse',
    order: 5,
    title: 'DeFi, NFTs & Metaverse',
    description: 'Explore decentralized finance, digital ownership, and the virtual economies being built on-chain.',
    icon: '🛍️',
    color: '#EC4899',
    estimatedMinutes: 24,
  },
  {
    id: 'tools-wallets',
    order: 6,
    title: 'Wallets & Dev Tools',
    description: 'Get hands-on with the wallets and developer tooling that make building and using Web3 possible.',
    icon: '🦊',
    color: '#10B981',
    estimatedMinutes: 16,
  },
  {
    id: 'case-studies',
    order: 7,
    title: 'Case Studies',
    description: 'Study the real projects that proved Web3 ideas could work at scale, warts and all.',
    icon: '🏆',
    color: '#EF4444',
    estimatedMinutes: 20,
  },
  {
    id: 'your-journey',
    order: 8,
    title: 'Your Web3 Journey',
    description: 'Turn everything you learned into a practical, responsible path forward as a builder or participant.',
    icon: '🚩',
    color: '#3B82F6',
    estimatedMinutes: 20,
  },
];
