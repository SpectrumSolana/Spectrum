/**
 * API Endpoints and Contracts Structure
 * 
 * This file defines the endpoints and data structures for integrating with the backend.
 * It is organized by screen and functionality to ensure clarity and maintainability.
 */

// Types
export interface Portfolio {
  assetDiversity: string;
  holdingPeriod: string;
  profitLoss: string;
  value: string;
}

export interface DeFiUsage {
  tvl: string;
  protocolsUsed: string;
  yieldFarming: boolean;
  lending: boolean;
}

export interface NFTActivity {
  totalOwned: number;
  avgHolding: string;
}

export interface RiskProfile {
  riskTolerance: string;
  leverage: boolean;
  insurance: string;
}

export interface LearningGrowth {
  knowledge: number;
  exp: number;
  community: string;
  governance: string;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  status: string;
}

export interface Mission {
  title: string;
  current: number;
  total: number;
  color?: string;
}

export interface ChainTool {
  name: string;
  type: string;
  apy: string;
  apyColor: string;
  expectedYield: string;
  riskLevel: string;
  riskLevelColor: string;
  complexity: string;
  complexityColor: string;
  leftButton: { label: string };
  rightButton: { label: string };
}

// Endpoints
export const ENDPOINTS = {
  // Home Screen
  PORTFOLIO: '/api/portfolio',
  DEFI_USAGE: '/api/defi-usage',
  NFT_ACTIVITY: '/api/nft-activity',
  RISK_PROFILE: '/api/risk-profile',
  LEARNING_GROWTH: '/api/learning-growth',
  TRANSACTIONS: '/api/transactions',

  // Learning Screen
  ACTIVE_MISSIONS: '/api/active-missions',
  PAST_MISSIONS: '/api/past-missions',

  // Chain Screen
  CHAIN_TOOLS: '/api/chain-tools',
};

// Contracts
export const CONTRACTS = {
  // Define any smart contracts or blockchain interactions here
  // Example:
  // WALLET_CONNECT: '0x...',
  // TOKEN_CONTRACT: '0x...',
}; 