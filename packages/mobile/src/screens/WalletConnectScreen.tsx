import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../navigation/OnboardingNavigator';
import { useWalletConnection } from '../modules/wallet/hooks/useWalletConnection';
import { SUPPORTED_WALLETS } from '../modules/wallet/constants/wallet.constants';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme/theme';

// Remove static icon imports, use SUPPORTED_WALLETS

type Props = NativeStackScreenProps<OnboardingStackParamList, 'WalletConnect'>;

const WalletConnectScreen: React.FC<Props> = ({ navigation }) => {
  const { select, connect, connecting, connected, publicKey } = useWalletConnection();
  const { setIsAuthenticated } = useAuth();

  // Only authenticate after wallet is connected and publicKey is available
  useEffect(() => {
    if (connected && publicKey) {
      setIsAuthenticated(true);
    }
  }, [connected, publicKey, setIsAuthenticated]);

  const handleWalletSelect = async (walletName: string) => {
    select(walletName);
    try {
      await connect();
    } catch (e) {
      // Handle error (show toast, etc)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect your wallet</Text>
      <Text style={styles.subtitle}>Choose one of the options down below.</Text>
      <View style={{ height: 32 }} />
      {SUPPORTED_WALLETS.map(wallet => (
        <TouchableOpacity
          key={wallet.name}
          style={styles.walletButton}
          onPress={() => handleWalletSelect(wallet.name)}
          disabled={connecting}
        >
          <Image source={{ uri: wallet.icon }} style={styles.walletIcon} />
          <Text style={styles.walletLabel}>{wallet.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#fff',
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    color: '#A3A3C2',
    fontSize: theme.fontSize.subtitle,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  walletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23233A',
    borderRadius: theme.borderRadius.button,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 16,
    width: '100%',
  },
  walletIcon: {
    width: 28,
    height: 28,
    marginRight: 14,
    resizeMode: 'contain',
  },
  walletLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: theme.fontSize.walletLabel,
    letterSpacing: 0.5,
  },
});

export default WalletConnectScreen; 