
import { Blockchain } from './types';

export const BLOCKCHAIN_LIBRARY: Blockchain[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    logo: '💎',
    description: 'The global settlement layer for the internet.',
    overview: 'Ethereum is the largest smart contract platform in the world. Since "The Merge" in 2022, it operates on a Proof-of-Stake (PoS) consensus. It serves as the foundation for decentralized finance (DeFi) and non-fungible tokens (NFTs), acting as a highly secure, decentralized global computer.',
    strengths: ['Unmatched Security', 'Deepest Liquidity', 'EIP-1559 (Fee Burning)', 'Modular Roadmap'],
    useCases: ['Institutional DeFi', 'Global Settlement', 'Tokenization of RWA', 'Digital Identity (ENS)'],
    dApps: [
      {
        name: 'Uniswap',
        category: 'DEX',
        use: 'Trustless Token Swapping',
        explanation: 'The pioneer of the Automated Market Maker (AMM) model. It allows anyone to swap tokens or provide liquidity without a central authority.',
        link: 'https://uniswap.org'
      },
      {
        name: 'Aave',
        category: 'Lending',
        use: 'Lending and borrowing assets',
        explanation: 'The leading liquidity protocol on Ethereum. Users can deposit assets to earn interest or borrow against their collateral in a decentralized way.',
        link: 'https://aave.com'
      },
      {
        name: 'Lido',
        category: 'Liquid Staking',
        use: 'Ethereum Staking Rewards',
        explanation: 'Allows users to stake ETH and receive stETH in return, which can be used in other DeFi protocols while earning staking rewards.',
        link: 'https://lido.fi'
      },
      {
        name: 'OpenSea',
        category: 'NFT',
        use: 'NFT Marketplace',
        explanation: 'The world\'s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs).',
        link: 'https://opensea.io'
      },
      {
        name: 'Blur',
        category: 'NFT',
        use: 'Professional NFT Trading',
        explanation: 'An NFT marketplace and aggregator designed specifically for pro traders, offering fast sweeps and zero marketplace fees.',
        link: 'https://blur.io'
      },
      {
        name: 'EigenLayer',
        category: 'Infrastructure',
        use: 'Restaking',
        explanation: 'A middleware protocol that allows ETH stakers to "restake" their ETH to secure other services (AVSs) and earn additional rewards.',
        link: 'https://www.eigenlayer.xyz'
      }
    ]
  },
  {
    id: 'solana',
    name: 'Solana',
    logo: '☀️',
    description: 'Ultra-high performance L1 for mass adoption.',
    overview: 'Solana is a high-speed blockchain that uses a unique "Proof of History" (PoH) mechanism to timestamp transactions. This allows the network to process 50,000+ transactions per second with sub-second finality and near-zero costs.',
    strengths: ['Parallel Execution', 'Sub-second Latency', 'Mobile-First (Saga)', 'Local Fee Markets'],
    useCases: ['Retail Trading', 'Real-time Gaming', 'DePIN (Physical Infra)', 'Global Payments'],
    dApps: [
      {
        name: 'Jupiter',
        category: 'DEX',
        use: 'Liquidity Aggregation',
        explanation: 'The most advanced aggregator on Solana. It finds the best price for any swap by routing through all available liquidity pools.',
        link: 'https://jup.ag'
      },
      {
        name: 'Tensor',
        category: 'NFT',
        use: 'Pro NFT Trading',
        explanation: 'The leading NFT marketplace for pro traders on Solana, featuring real-time data, AMM support, and deep liquidity.',
        link: 'https://www.tensor.trade'
      },
      {
        name: 'Drift Protocol',
        category: 'Perpetuals',
        use: 'On-chain Leverage Trading',
        explanation: 'A decentralized exchange offering cross-margined perpetual swaps, lending, and borrowing with a high-performance order book.',
        link: 'https://drift.trade'
      },
      {
        name: 'Helium',
        category: 'Infrastructure',
        use: 'DePIN (Physical Infrastructure)',
        explanation: 'A decentralized wireless network that allows people to get paid for providing wireless coverage with hotspots.',
        link: 'https://www.helium.com'
      },
      {
        name: 'Jito',
        category: 'Liquid Staking',
        use: 'MEV-enhanced Staking',
        explanation: 'A liquid staking protocol for Solana that distributes both staking rewards and MEV (Maximal Extractable Value) rewards to users.',
        link: 'https://www.jito.network'
      }
    ]
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    logo: '🌀',
    description: 'The leading Layer 2 for DeFi.',
    overview: 'Arbitrum is an Optimistic Rollup that scales Ethereum by moving transaction execution off-chain while maintaining Ethereum\'s security. It is currently the L2 with the highest Total Value Locked (TVL).',
    strengths: ['High TVL', 'EVM Compatibility', 'Developer Adoption', 'Security'],
    useCases: ['Advanced DeFi', 'Perpetuals', 'Gaming', 'Yield Aggregation'],
    dApps: [
      {
        name: 'GMX',
        category: 'Perpetuals',
        use: 'Leverage Trading',
        explanation: 'A decentralized perpetual exchange that allows users to trade BTC, ETH, and other assets with up to 50x leverage.',
        link: 'https://gmx.io'
      },
      {
        name: 'Radiant Capital',
        category: 'Lending',
        use: 'Omnichain Money Market',
        explanation: 'A cross-chain lending protocol that allows users to deposit collateral on one chain and borrow on another.',
        link: 'https://radiant.capital'
      },
      {
        name: 'Treasure DAO',
        category: 'Gaming',
        use: 'Decentralized Gaming Console',
        explanation: 'An ecosystem of games connected by a central currency ($MAGIC) and shared infrastructure.',
        link: 'https://treasure.lol'
      },
      {
        name: 'Camelot',
        category: 'DEX',
        use: 'Ecosystem-focused DEX',
        explanation: 'A community-driven DEX on Arbitrum designed to support new projects launching on the chain.',
        link: 'https://camelot.exchange'
      }
    ]
  },
  {
    id: 'base',
    name: 'Base',
    logo: '🔵',
    description: 'Coinbase\'s gateway to the on-chain economy.',
    overview: 'Base is a layer-2 network built on top of Ethereum by Coinbase using the OP Stack. It provides a secure, low-cost way for builders to reach Coinbase\'s 100M+ users.',
    strengths: ['Coinbase Integration', 'Low Fees', 'Ecosystem Support', 'Social Innovation'],
    useCases: ['Consumer Apps', 'SocialFi', 'NFTs', 'Global Commerce'],
    dApps: [
      {
        name: 'Aerodrome',
        category: 'DEX',
        use: 'Next-gen Liquidity Hub',
        explanation: 'The central trading and liquidity marketplace on Base, utilizing a sophisticated incentive model for voters.',
        link: 'https://aerodrome.finance'
      },
      {
        name: 'Friend.tech',
        category: 'Social',
        use: 'Social Monetization',
        explanation: 'A decentralized social network where users buy and sell "Keys" (shares) to access private chat rooms with creators.',
        link: 'https://friend.tech'
      },
      {
        name: 'Moonwell',
        category: 'Lending',
        use: 'Open Lending Protocol',
        explanation: 'An open lending and borrowing protocol on Base, focusing on security and ease of use for retail users.',
        link: 'https://moonwell.fi'
      },
      {
        name: 'Base Paint',
        category: 'NFT',
        use: 'Collaborative Art',
        explanation: 'An experimental dApp where hundreds of artists collaborate daily on a shared canvas to create unique NFTs.',
        link: 'https://basepaint.xyz'
      }
    ]
  },
  {
    id: 'polygon',
    name: 'Polygon',
    logo: '💜',
    description: 'Scaling Ethereum via the AggLayer.',
    overview: 'Polygon is an "Aggregated Network" for Ethereum scaling. It includes the popular Polygon PoS sidechain and newer zkEVM technologies focused on privacy and scalability.',
    strengths: ['Corporate Partnerships', 'Massive Userbase', 'Zero-Knowledge Tech', 'Low Fees'],
    useCases: ['Brand Loyalty', 'Gaming', 'Institutional Finance', 'Enterprise Infra'],
    dApps: [
      {
        name: 'QuickSwap',
        category: 'DEX',
        use: 'Fast Token Swaps',
        explanation: 'The leading DEX on Polygon, offering nearly instant swaps with fees costing fractions of a cent.',
        link: 'https://quickswap.exchange'
      },
      {
        name: 'Sunflower Land',
        category: 'Gaming',
        use: 'Play-to-Own Farming',
        explanation: 'A popular decentralized farming game where every asset, from crops to land, is owned by the player as an NFT.',
        link: 'https://sunflower-land.com'
      },
      {
        name: 'Lens Protocol',
        category: 'Social',
        use: 'Decentralized Social Graph',
        explanation: 'A protocol that allows creators to own their social data and followers, enabling many social apps to be built on top.',
        link: 'https://www.lens.xyz'
      }
    ]
  },
  {
    id: 'sui',
    name: 'Sui',
    logo: '💧',
    description: 'Object-centric L1 for high-speed apps.',
    overview: 'Sui uses a unique object-based data model and the Move programming language. This allows it to handle many transactions in parallel, achieving incredible speed.',
    strengths: ['Parallel Execution', 'Move Language', 'Programmable Objects', 'Ultra-low Latency'],
    useCases: ['High-fidelity Gaming', 'Dynamic NFTs', 'DeFi Aggregators', 'Asset Custody'],
    dApps: [
      {
        name: 'Cetus',
        category: 'DEX',
        use: 'Concentrated Liquidity',
        explanation: 'A pioneer DEX built on Sui and Aptos, focusing on capital efficiency for traders and liquidity providers.',
        link: 'https://www.cetus.zone'
      },
      {
        name: 'Turbos Finance',
        category: 'DEX',
        use: 'Efficient Swaps',
        explanation: 'An AMM-style DEX on Sui that provides a high-performance trading experience with low slippage.',
        link: 'https://turbos.finance'
      },
      {
        name: 'Navi Protocol',
        category: 'Lending',
        use: 'One-stop Liquidity',
        explanation: 'The native one-stop liquidity protocol on Sui, allowing users to earn yield or borrow assets securely.',
        link: 'https://naviprotocol.io'
      },
      {
        name: 'Bluefin',
        category: 'Perpetuals',
        use: 'Professional Trading',
        explanation: 'A high-speed perpetual exchange that mimics the experience of a centralized exchange on-chain.',
        link: 'https://bluefin.io'
      }
    ]
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    logo: '🔺',
    description: 'The blockchain of blockchains via Subnets.',
    overview: 'Avalanche features a unique multi-chain architecture (P-Chain, X-Chain, C-Chain) and "Subnets," which are customizable, sovereign blockchains built within the ecosystem.',
    strengths: ['Sub-second Finality', 'Custom Subnets', 'Highly Decentralized', 'Eco-friendly'],
    useCases: ['Enterprise Tech', 'Institutional DeFi', 'Gaming Subnets', 'Asset Issuance'],
    dApps: [
      {
        name: 'Trader Joe',
        category: 'DEX',
        use: 'All-in-one DeFi Hub',
        explanation: 'The heart of Avalanche DeFi, offering trading, lending, yield farming, and an NFT marketplace.',
        link: 'https://traderjoexyz.com'
      },
      {
        name: 'Benqi',
        category: 'Lending',
        use: 'Algorithmic Liquidity',
        explanation: 'A leading lending protocol and liquid staking provider on Avalanche, serving over 100k+ users.',
        link: 'https://benqi.fi'
      },
      {
        name: 'Shrapnel',
        category: 'Gaming',
        use: 'AAA FPS Gaming',
        explanation: 'The first blockchain-enabled AAA first-person shooter game, powered by an Avalanche Subnet.',
        link: 'https://www.shrapnel.com'
      },
      {
        name: 'Yield Yak',
        category: 'Yield',
        use: 'Auto-compounding Yield',
        explanation: 'A yield aggregator that automatically compounds user rewards to maximize returns with minimal effort.',
        link: 'https://yieldyak.com'
      }
    ]
  },
  {
    id: 'aptos',
    name: 'Aptos',
    logo: '⚫',
    description: 'Safe, scalable L1 using the Move VM.',
    overview: 'Aptos is a high-performance L1 designed with a focus on developer experience and user safety. It uses the Move language and a parallel execution engine (Block-STM).',
    strengths: ['Safety Focus', 'Block-STM Engine', 'High Throughput', 'Vibrant Community'],
    useCases: ['Consumer Web3', 'Social Networking', 'Gaming', 'Efficient DeFi'],
    dApps: [
      {
        name: 'Thala',
        category: 'Yield',
        use: 'Stablecoin and Yield',
        explanation: 'A native DeFi protocol providing a decentralized stablecoin (MOD) and liquid staking for the Aptos ecosystem.',
        link: 'https://www.thala.fi'
      },
      {
        name: 'Liquidswap',
        category: 'DEX',
        use: 'Native Swap Protocol',
        explanation: 'The first DEX on Aptos, offering a variety of trading pairs and farming opportunities for early adopters.',
        link: 'https://liquidswap.com'
      },
      {
        name: 'Amnis Finance',
        category: 'Liquid Staking',
        use: 'Aptos Staking Rewards',
        explanation: 'A liquid staking protocol that enables users to unlock the liquidity of their staked APT tokens.',
        link: 'https://amnis.finance'
      },
      {
        name: 'Aries Markets',
        category: 'Lending',
        use: 'Margin Trading',
        explanation: 'A decentralized exchange that combines a limit order book with on-chain margin trading and lending.',
        link: 'https://ariesmarkets.xyz'
      }
    ]
  },
  {
    id: 'bsc',
    name: 'BNB Chain',
    logo: '🔶',
    description: 'The world\'s largest community-driven L1.',
    overview: 'BNB Chain is an EVM-compatible network that offers high throughput and low fees. It is closely linked to the Binance ecosystem but operates as an independent, decentralized network.',
    strengths: ['Massive User Base', 'Binance Bridge Access', 'Very Low Fees', 'Robust Ecosystem'],
    useCases: ['Retail DeFi', 'Play-to-Earn Gaming', 'SocialFi', 'NFTs'],
    dApps: [
      {
        name: 'PancakeSwap',
        category: 'DEX',
        use: 'Leading Multichain DEX',
        explanation: 'The most popular DEX on BNB Chain, featuring swaps, yield farming, prediction markets, and lotteries.',
        link: 'https://pancakeswap.finance'
      },
      {
        name: 'Venus Protocol',
        category: 'Lending',
        use: 'Money Market Hub',
        explanation: 'An algorithmic money market for lending and borrowing with decentralized stablecoins.',
        link: 'https://venus.io'
      },
      {
        name: 'Alpaca Finance',
        category: 'Yield',
        use: 'Leveraged Yield Farming',
        explanation: 'The largest lending protocol on BNB Chain that allows for leveraged yield farming to maximize returns.',
        link: 'https://www.alpacafinance.org'
      },
      {
        name: 'NFPrompt',
        category: 'NFT',
        use: 'AI-Generated Content',
        explanation: 'A platform that allows users to create and mint AI-powered NFTs, bridging AI and Web3.',
        link: 'https://nfprompt.io'
      }
    ]
  },
  {
    id: 'optimism',
    name: 'Optimism',
    logo: '🔴',
    description: 'Scaling Ethereum via the Superchain.',
    overview: 'Optimism is an L2 scaling solution that pioneered the "OP Stack." It focuses on "Retroactive Public Goods Funding" to reward developers who build useful tools.',
    strengths: ['OP Stack Infra', 'RetroPGF Model', 'Superchain Concept', 'Ethereum Alignment'],
    useCases: ['DAO Governance', 'Public Goods', 'Consumer Apps', 'Interoperable L2s'],
    dApps: [
      {
        name: 'Velodrome',
        category: 'DEX',
        use: 'Central Liquidity Hub',
        explanation: 'The primary trading and liquidity protocol on Optimism, designed to reward long-term ecosystem growth.',
        link: 'https://velodrome.finance'
      },
      {
        name: 'Synthetix',
        category: 'Perpetuals',
        use: 'On-chain Derivatives',
        explanation: 'A derivatives protocol for synthetic assets and decentralized perpetual trading with deep liquidity.',
        link: 'https://synthetix.io'
      },
      {
        name: 'Lyra',
        category: 'Perpetuals',
        use: 'Options Trading',
        explanation: 'A decentralized options exchange that offers traders low-cost, liquid, and accessible options markets.',
        link: 'https://www.lyra.finance'
      }
    ]
  }
];
