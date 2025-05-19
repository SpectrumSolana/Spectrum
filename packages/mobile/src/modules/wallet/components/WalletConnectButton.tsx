import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useWallet } from '../providers/WalletProvider';
import { STRINGS } from '../constants/strings';

// Constants
const TEST_IDS = {
  BUTTON: 'wallet-connect-button',
  LOADING: 'wallet-connect-loading',
  TEXT: 'wallet-connect-text',
} as const;

const ACCESSIBILITY = {
  BUTTON: {
    accessible: true,
    accessibilityRole: 'button',
    accessibilityState: {
      disabled: false,
    },
  },
  LOADING: {
    accessible: true,
    accessibilityRole: 'progressbar',
    accessibilityLabel: 'Connecting wallet',
  },
  TEXT: {
    accessible: true,
    accessibilityRole: 'text',
  },
} as const;

interface WalletConnectButtonProps {
  onError?: (error: Error) => void;
  testID?: string;
}

export const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({ 
  onError,
  testID = TEST_IDS.BUTTON,
}) => {
  const { connected, connecting, disconnect, connect } = useWallet();

  const handlePress = useCallback(async () => {
    try {
      if (connected) {
        await disconnect();
      } else {
        await connect();
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      onError?.(error as Error);
    }
  }, [connected, connect, disconnect, onError]);

  const buttonText = connected ? STRINGS.DISCONNECT_WALLET : STRINGS.CONNECT_WALLET;

  const buttonStyle = [
    styles.button,
    { backgroundColor: connected ? '#4CAF50' : '#6200EE' }, // success or primary
  ];

  const buttonAccessibility = {
    ...ACCESSIBILITY.BUTTON,
    accessibilityState: {
      disabled: connecting,
    },
    accessibilityLabel: buttonText,
    accessibilityHint: connected 
      ? 'Double tap to disconnect your wallet'
      : 'Double tap to connect your wallet',
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={connecting}
      testID={testID}
      {...buttonAccessibility}
    >
      {connecting ? (
        <ActivityIndicator 
          testID={`${testID}-loading`}
          color={'#fff'}
          {...ACCESSIBILITY.LOADING}
        />
      ) : (
        <Text 
          style={[styles.buttonText, { color: '#fff' }]}
          testID={`${testID}-text`}
          {...ACCESSIBILITY.TEXT}
        >
          {buttonText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 