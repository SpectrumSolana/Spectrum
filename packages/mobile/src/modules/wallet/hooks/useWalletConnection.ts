import { useCallback } from 'react';
import { useWallet } from '../providers/WalletProvider';
import { WalletError } from '../types/wallet.types';
import { WALLET_CONNECT_ERRORS } from '../constants/wallet.constants';

export const useWalletConnection = () => {
  const wallet = useWallet();

  const handleConnect = useCallback(async () => {
    try {
      await wallet.connect();
    } catch (error) {
      const walletError: WalletError = {
        name: 'ConnectionError',
        message: WALLET_CONNECT_ERRORS.CONNECTION_FAILED,
      };
      throw walletError;
    }
  }, [wallet]);

  const handleDisconnect = useCallback(async () => {
    try {
      await wallet.disconnect();
    } catch (error) {
      const walletError: WalletError = {
        name: 'DisconnectionError',
        message: WALLET_CONNECT_ERRORS.DISCONNECTION_FAILED,
      };
      throw walletError;
    }
  }, [wallet]);

  const formatAddress = useCallback((address: string) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }, []);

  return {
    ...wallet,
    connect: handleConnect,
    disconnect: handleDisconnect,
    formatAddress,
  };
}; 