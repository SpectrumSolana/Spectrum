import { PublicKey } from '@solana/web3.js';

export type WalletNetwork = 'mainnet-beta' | 'testnet' | 'devnet';

export interface WalletConfig {
  network: WalletNetwork;
  autoConnect: boolean;
}

export interface WalletState {
  connected: boolean;
  publicKey: PublicKey | null;
  connecting: boolean;
  disconnecting: boolean;
}

export interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  select: (walletName: string) => void;
}

export interface WalletInfo {
  name: string;
  url: string;
  icon: string;
  deepLink?: string;
}

export interface WalletError {
  name: string;
  message: string;
} 