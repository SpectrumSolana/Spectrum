import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { WalletConfig, WalletContextType, WalletState } from '../types/wallet.types';
import { DEFAULT_CONFIG } from '../constants/wallet.constants';
import { transact, Web3MobileWallet } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { PublicKey } from '@solana/web3.js';
import * as Linking from 'expo-linking';

// Polyfills for web3.js (ensure these are at the top of your entrypoint as well)
import 'react-native-get-random-values';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

const WalletContext = createContext<WalletContextType | null>(null);

const initialState: WalletState = {
  connected: false,
  publicKey: null,
  connecting: false,
  disconnecting: false,
};

const APP_IDENTITY = {
  name: 'Spectrum',
  uri: 'https://yourapp.com', // Update to your app's URI
  icon: 'favicon.ico', // Update to your app's icon if available
};

const PHANTOM_DEEPLINK_BASE = 'https://phantom.app/ul/v1/connect';

export const WalletProvider: React.FC<{
  children: React.ReactNode;
  config?: Partial<WalletConfig>;
}> = ({ children, config = {} }) => {
  const [state, setState] = useState<WalletState>(initialState);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // Listen for incoming deep links
  useEffect(() => {
    const handleUrl = (event: { url: string }) => {
      const { url } = event;
      // Parse Phantom redirect URL and extract public key
      const parsed = Linking.parse(url);
      if (parsed.queryParams && parsed.queryParams.public_key) {
        setState(prev => ({
          ...prev,
          connected: true,
          connecting: false,
          publicKey: new PublicKey(parsed.queryParams.public_key as string),
        }));
      }
    };
    const subscription = Linking.addEventListener('url', handleUrl);
    return () => subscription.remove();
  }, []);

  // Open Phantom for connection
  const connectPhantom = useCallback(async () => {
    setState(prev => ({ ...prev, connecting: true }));
    const dappUrl = Linking.createURL('/onConnect'); // Your app's deep link
    const phantomUrl = `${PHANTOM_DEEPLINK_BASE}?app_url=${encodeURIComponent(dappUrl)}&redirect_link=${encodeURIComponent(dappUrl)}`;
    await Linking.openURL(phantomUrl);
  }, []);

  const connect = useCallback(async () => {
    if (selectedWallet === 'Phantom') {
      await connectPhantom();
    } else {
      // Add other wallet deep link logic here
      setState(prev => ({ ...prev, connecting: false }));
    }
  }, [selectedWallet, connectPhantom]);

  const disconnect = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, disconnecting: true }));
      if (authToken) {
        await transact(async (wallet: Web3MobileWallet) => {
          await wallet.deauthorize({ auth_token: authToken });
        });
        setAuthToken(null);
      }
      setState(prev => ({
        ...prev,
        disconnecting: false,
        connected: false,
        publicKey: null,
      }));
    } catch (error) {
      setState(prev => ({ ...prev, disconnecting: false }));
      throw error;
    }
  }, [authToken]);

  const select = useCallback((walletName: string) => {
    setSelectedWallet(walletName);
  }, []);

  const value: WalletContextType = {
    ...state,
    connect,
    disconnect,
    select,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 