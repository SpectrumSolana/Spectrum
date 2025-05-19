import { WalletInfo } from '../types/wallet.types';

export const SUPPORTED_WALLETS: WalletInfo[] = [
  {
    name: 'Phantom',
    url: 'https://phantom.app/',
    icon: 'https://phantom.app/img/phantom-logo.svg',
    deepLink: 'https://phantom.app/ul/browse/',
  },
  {
    name: 'Solflare',
    url: 'https://solflare.com/',
    icon: 'https://solflare.com/assets/logo.svg',
    deepLink: 'https://solflare.com/ul/browse/',
  },
  {
    name: 'Backpack',
    url: 'https://www.backpack.app/',
    icon: 'https://www.backpack.app/logo.svg',
    deepLink: 'https://www.backpack.app/ul/browse/',
  },
];

export const DEFAULT_CONFIG = {
  network: 'devnet' as const,
  autoConnect: true,
};

export const WALLET_CONNECT_ERRORS = {
  NO_WALLET: 'No wallet found',
  CONNECTION_FAILED: 'Failed to connect to wallet',
  DISCONNECTION_FAILED: 'Failed to disconnect from wallet',
  NETWORK_ERROR: 'Network error occurred',
} as const; 