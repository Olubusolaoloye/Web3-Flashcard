
import { Lesson } from './types';

export const WEB3_GUIDE_LESSONS: Lesson[] = [
  {
    id: 1,
    title: "The Web Evolution",
    content: "Web 1.0 was 'Read-only' (static). Web 2.0 is 'Read-Write' (social, centralized). Web 3.0 is 'Read-Write-Own' (decentralized and user-owned).",
    keyTakeaway: "Web3 shifts power from corporations back to the individuals.",
    icon: "🌐"
  },
  {
    id: 2,
    title: "Decentralized Backbone",
    content: "Unlike Web2, where data lives on central servers (Facebook/Google), Web3 data is distributed across a network. No single entity can turn it off.",
    keyTakeaway: "Resilience through distribution.",
    icon: "🕸️"
  },
  {
    id: 3,
    title: "Trustless Transactions",
    content: "Web3 doesn't require a middleman (Bank) to verify a payment. Cryptography and consensus algorithms prove the transaction is valid.",
    keyTakeaway: "Mathematical proof replaces corporate trust.",
    icon: "🛡️"
  },
  {
    id: 4,
    title: "Digital Ownership",
    content: "In Web2, you 'rent' your account. In Web3, you own your assets via Private Keys. Your items can't be deleted or confiscated by the platform.",
    keyTakeaway: "Your assets, your control.",
    icon: "👑"
  },
  {
    id: 5,
    title: "Blockchain 101",
    content: "A chain of blocks containing transaction data. Each block is cryptographically linked to the previous one, making history immutable.",
    keyTakeaway: "A permanent, tamper-proof record of everything.",
    icon: "⛓️"
  },
  {
    id: 6,
    title: "Pillar: Immutability",
    content: "Once data is written to a block and confirmed, it is permanent. This prevents fraud and ensures a single source of truth.",
    keyTakeaway: "History that cannot be rewritten.",
    icon: "🔒"
  },
  {
    id: 7,
    title: "Pillar: Transparency",
    content: "Every transaction is public on the ledger. Anyone can audit the system, ensuring accountability while keeping personal data private.",
    keyTakeaway: "Radical openness for a fairer web.",
    icon: "🔍"
  },
  {
    id: 8,
    title: "Pillar: Interoperability",
    content: "Systems and blockchains must 'talk' to each other. This allows you to use your NFT avatar from one game in another entirely.",
    keyTakeaway: "A unified digital universe across different chains.",
    icon: "🔌"
  },
  {
    id: 9,
    title: "Pillar: Tokenization",
    content: "Transforming any asset (art, land, stocks) into digital tokens. This makes trading fast, 24/7, and available globally.",
    keyTakeaway: "Turning the world's value into liquid tokens.",
    icon: "🎟️"
  },
  {
    id: 10,
    title: "DApp Development",
    content: "Decentralized Applications run on peer-to-peer networks. They use Smart Contracts as their backend and are censorship-resistant.",
    keyTakeaway: "Apps that nobody—even the creator—can turn off.",
    icon: "📱"
  },
  {
    id: 11,
    title: "DAO Governance",
    content: "Decentralized Autonomous Organizations are run by code and community votes. No CEOs, just token holders deciding the future.",
    keyTakeaway: "Democracy built directly into the software.",
    icon: "🏛️"
  },
  {
    id: 12,
    title: "Smart Contracts",
    content: "Self-executing contracts where the terms are written in code. They automatically trigger when conditions (e.g., payment) are met.",
    keyTakeaway: "Trust the code, not the lawyers.",
    icon: "📜"
  },
  {
    id: 13,
    title: "The Critical Audit",
    content: "Because code is immutable, bugs can be fatal. Smart Contract Audits involve experts scanning code to find hacks before they happen.",
    keyTakeaway: "Security is non-negotiable in Web3.",
    icon: "🕵️"
  },
  {
    id: 14,
    title: "Ethereum: The Giant",
    content: "The pioneer of smart contracts. Uses Solidity language. It is the birthplace of DeFi and NFTs, moving from PoW to PoS (The Merge).",
    keyTakeaway: "The secure foundation of the decentralized world.",
    icon: "💎"
  },
  {
    id: 15,
    title: "Solana: The Fast",
    content: "Uses Proof of History (PoH) to achieve 50k+ transactions per second. It uses Rust and C for high-performance, low-cost apps.",
    keyTakeaway: "Speed and scale for mainstream users.",
    icon: "☀️"
  },
  {
    id: 16,
    title: "Polkadot: The Connector",
    content: "A multi-chain framework linking 'Parachains' into one network. It focuses on true cross-chain communication and shared security.",
    keyTakeaway: "Scaling by connecting specialized blockchains.",
    icon: "🌀"
  },
  {
    id: 17,
    title: "Bitcoin: The Pioneer",
    content: "The original store of value. While standalone, solutions like Lightning Network allow it to be used for fast payments and DApps.",
    keyTakeaway: "The most secure and decentralized asset in history.",
    icon: "₿"
  },
  {
    id: 18,
    title: "Avalanche: The Subnet",
    content: "Rapid finality (<1 sec) via Avalanche consensus. It allows creators to build custom 'Subnets' or mini-blockchains with their own rules.",
    keyTakeaway: "Speed and flexibility for enterprise use.",
    icon: "🔺"
  },
  {
    id: 19,
    title: "Cardano: The Academic",
    content: "Built on peer-reviewed research. Uses Haskell/Plutus for high-assurance code. Focuses on sustainability and identity solutions.",
    keyTakeaway: "A research-driven path to a sustainable web.",
    icon: "₳"
  },
  {
    id: 20,
    title: "Layer 2 Solutions",
    content: "Protocols like Rollups (Optimism/Arbitrum) that handle transactions off the main chain and post them back. This saves gas fees.",
    keyTakeaway: "Ethereum's security at a fraction of the cost.",
    icon: "⚡"
  },
  {
    id: 21,
    title: "NFT Marketplaces",
    content: "Vibrant digital bazaars where you mint, buy, and sell unique assets. Secured by blockchain to prove authenticity and history.",
    keyTakeaway: "Direct monetization for creators globally.",
    icon: "🛍️"
  },
  {
    id: 22,
    title: "NFT Gaming (P2E)",
    content: "Games where items (swords, land) are NFTs. Players can earn value by playing and own their in-game achievements truly.",
    keyTakeaway: "Turning playtime into earned digital assets.",
    icon: "🎮"
  },
  {
    id: 23,
    title: "The Metaverse",
    content: "Interconnected virtual habitats. It's not just a game; it's a place to work, live, and trade with actual economic value.",
    keyTakeaway: "A limitless world for social and economic life.",
    icon: "🪐"
  },
  {
    id: 24,
    title: "VR in Web3",
    content: "Virtual Reality provides the immersion. Web3 provides the ownership. Together, they make virtual worlds feel 'real' and permanent.",
    keyTakeaway: "Being 'there' in your own user-owned space.",
    icon: "🕶️"
  },
  {
    id: 25,
    title: "AI Integration",
    content: "AI processes data; Web3 secures it. Decentralized AI models are democratic, less biased, and offer tailored, private experiences.",
    keyTakeaway: "Intelligent apps that respect your data privacy.",
    icon: "🤖"
  },
  {
    id: 26,
    title: "Machine Learning (ML)",
    content: "ML helps DApps become smarter. On Web3, 'Federated Learning' allows devices to learn patterns without ever sharing raw user data.",
    keyTakeaway: "Smarter software through decentralized learning.",
    icon: "🧠"
  },
  {
    id: 27,
    title: "Hardhat & Truffle",
    content: "Development environments for Ethereum. They allow you to write, test, and deploy smart contracts with high automation.",
    keyTakeaway: "Professional tools for the modern dev stack.",
    icon: "🛠️"
  },
  {
    id: 28,
    title: "Web3.js & Remix",
    content: "Web3.js is the bridge between JS and Blockchain. Remix is a browser-based IDE for fast contract prototyping.",
    keyTakeaway: "Simplified entry points for building DApps.",
    icon: "💻"
  },
  {
    id: 29,
    title: "MetaMask: The Gateway",
    content: "A secure wallet that acts as your identity. It signs transactions and connects you to every DApp in the ecosystem.",
    keyTakeaway: "Your key to the decentralized universe.",
    icon: "🦊"
  },
  {
    id: 30,
    title: "Alchemy & Infura",
    content: "Infrastructure providers. They offer reliable nodes so developers don't have to host their own hardware to access the blockchain.",
    keyTakeaway: "Supercharged infrastructure for scalable apps.",
    icon: "🏗️"
  },
  {
    id: 31,
    title: "Axie Infinity Success",
    content: "The play-to-earn pioneer. Proved that gamers can earn a living through blockchain interaction and community economy.",
    keyTakeaway: "Gamified finance (GameFi) is a reality.",
    icon: "👾"
  },
  {
    id: 32,
    title: "Decentraland Success",
    content: "A virtual world governed by users. It hosts concerts and fashion shows where land is bought and sold as NFTs.",
    keyTakeaway: "User-governed virtual real estate works.",
    icon: "🏜️"
  },
  {
    id: 33,
    title: "Uniswap Success",
    content: "Proved that Automated Market Makers (AMM) could replace order books. It allows trustless swaps without a central exchange.",
    keyTakeaway: "DeFi is the future of global trading.",
    icon: "🦄"
  },
  {
    id: 34,
    title: "OpenSea Success",
    content: "The world's largest NFT marketplace. Demonstrated that peer-to-peer art trading is a multi-billion dollar industry.",
    keyTakeaway: "Creators now have global, direct reach.",
    icon: "🌊"
  },
  {
    id: 35,
    title: "The Graph Success",
    content: "The 'Google' of Blockchains. It indexes data so developers can easily query information from decentralized networks.",
    keyTakeaway: "Data indexing is vital for usable DApps.",
    icon: "📊"
  },
  {
    id: 36,
    title: "Economic Model Shift",
    content: "Web2 monetizes user data. Web3 monetizes protocol utility and value creation. Users participate in the upside of the network.",
    keyTakeaway: "From data-for-free to value-for-participation.",
    icon: "💰"
  },
  {
    id: 37,
    title: "Starting Small",
    content: "Don't build the next Ethereum day one. Start with small DApps, join hackathons, and contribute to open-source projects.",
    keyTakeaway: "Master the basics to build the complex.",
    icon: "🌱"
  },
  {
    id: 38,
    title: "Building Community",
    content: "Web3 is social. Success depends on supporters who believe in the vision. Listen to feedback and grow together with users.",
    keyTakeaway: "A strong community is the best marketing.",
    icon: "🤝"
  },
  {
    id: 39,
    title: "Future: Public Goods",
    content: "Web3 allows for funding things that benefit everyone (open source, climate) via models like Retroactive Public Goods Funding.",
    keyTakeaway: "Incentivizing building for the collective good.",
    icon: "🎁"
  },
  {
    id: 40,
    title: "Final Mission",
    content: "Web3 is a paradigm shift. We are not just passengers; we are the builders. Stay curious, stay persistent, and enjoy the journey.",
    keyTakeaway: "The future is decentralized—let's build it.",
    icon: "🚩"
  }
];
