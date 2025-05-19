import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { theme } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { FontAwesome5 } from '@expo/vector-icons';

interface RecommendationCardProps {
  name: string;
  description: string;
  confidence: number;
  url?: string;
}

const iconMap: { [key: string]: { name: string; color: string } } = {
  'Aave': { name: 'university', color: '#7ED957' },
  'Uniswap': { name: 'water', color: '#FFD057' },
  'Jupiter': { name: 'globe', color: '#7B6FF0' },
  'Magic Eden': { name: 'magic', color: '#FFD057' },
  'OpenSea': { name: 'ship', color: '#00CFFF' },
  'Tensor': { name: 'chart-line', color: '#FF3B30' },
  'Squads': { name: 'users', color: '#7ED957' },
  'Grape': { name: 'comments', color: '#A3A3C2' },
  'Superteam': { name: 'user-astronaut', color: '#FFD057' },
  'Mango Markets': { name: 'chart-pie', color: '#FF3B30' },
  'Drift Protocol': { name: 'exchange-alt', color: '#7B6FF0' },
  'Jupiter Aggregator': { name: 'globe', color: '#7B6FF0' },
};

const guidance: { [key: string]: string[] } = {
  'Aave': [
    '1. Connect your wallet to Aave.',
    '2. Select an asset to supply or borrow.',
    '3. Review APY and risk before confirming.',
    '4. Approve the transaction in your wallet.',
    '5. Track your position in the dashboard.'
  ],
  'Uniswap': [
    '1. Connect your wallet to Uniswap.',
    '2. Choose tokens to swap or provide liquidity.',
    '3. Set your slippage tolerance.',
    '4. Confirm the transaction in your wallet.',
    '5. View your liquidity positions.'
  ],
  'Jupiter': [
    '1. Connect your wallet to Jupiter.',
    '2. Select tokens to swap.',
    '3. Review the best price and route.',
    '4. Confirm the transaction in your wallet.',
    '5. Track your swap history.'
  ],
  'Magic Eden': [
    '1. Connect your wallet to Magic Eden.',
    '2. Browse or search for NFTs.',
    '3. Select an NFT to buy or list.',
    '4. Confirm the transaction in your wallet.',
    '5. View your NFTs in your profile.'
  ],
  'OpenSea': [
    '1. Connect your wallet to OpenSea.',
    '2. Explore collections or search for NFTs.',
    '3. Buy, sell, or list NFTs.',
    '4. Confirm the transaction in your wallet.',
    '5. Manage your NFTs in your account.'
  ],
  'Tensor': [
    '1. Connect your wallet to Tensor.',
    '2. Browse NFT collections.',
    '3. Use advanced trading tools.',
    '4. Confirm the transaction in your wallet.',
    '5. Track your trades and portfolio.'
  ],
  'Squads': [
    '1. Connect your wallet to Squads.',
    '2. Create or join a squad.',
    '3. Manage treasury and permissions.',
    '4. Propose and vote on actions.',
    '5. Collaborate with your team.'
  ],
  'Grape': [
    '1. Connect your wallet to Grape.',
    '2. Join the community DAO.',
    '3. Participate in governance.',
    '4. Earn rewards for contributions.',
    '5. Engage in social activities.'
  ],
  'Superteam': [
    '1. Connect your wallet to Superteam.',
    '2. Join as a builder or contributor.',
    '3. Apply for bounties or grants.',
    '4. Collaborate on projects.',
    '5. Grow your Web3 skills.'
  ],
  'Mango Markets': [
    '1. Connect your wallet to Mango Markets.',
    '2. Deposit collateral.',
    '3. Trade with leverage.',
    '4. Monitor your positions.',
    '5. Withdraw profits or collateral.'
  ],
  'Drift Protocol': [
    '1. Connect your wallet to Drift.',
    '2. Deposit collateral.',
    '3. Trade perpetuals.',
    '4. Manage your risk.',
    '5. Track your PnL.'
  ],
  'Jupiter Aggregator': [
    '1. Connect your wallet to Jupiter.',
    '2. Select tokens to swap.',
    '3. Review the best price and route.',
    '4. Confirm the transaction in your wallet.',
    '5. Track your swap history.'
  ],
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({ name, description, confidence, url }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleTryNow = () => {
    if (url) {
      navigation.navigate('WebView', { url, title: name });
    }
  };

  const handleLearn = () => {
    setModalVisible(true);
  };

  const steps: string[] = guidance[name] || [
    '1. Connect your wallet.',
    '2. Follow the on-screen instructions.',
    '3. Confirm transactions in your wallet.',
    '4. Track your progress on the platform.'
  ];

  const iconInfo = iconMap[name] || { name: 'cube', color: theme.colors.primary };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name={iconInfo.name as any} size={32} color={iconInfo.color} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.headerTextRow}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.confidenceBadge}>
              <Text style={styles.confidenceText}>{confidence}% match</Text>
            </View>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleLearn}>
          <Text style={styles.buttonText}>Learn</Text>
        </TouchableOpacity>
        {url && (
          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleTryNow}>
            <Text style={styles.buttonText}>Try now</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Guidance Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(20,20,31,0.96)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <View style={{ backgroundColor: theme.colors.cardBackground, borderRadius: 16, padding: 24, width: '100%', maxWidth: 340 }}>
            <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 18, marginBottom: 12, textAlign: 'center' }}>How to use {name}</Text>
            {steps.map((step: string, idx: number) => (
              <Text key={idx} style={{ color: '#fff', fontSize: 15, marginBottom: 8 }}>{step}</Text>
            ))}
            <TouchableOpacity
              style={{ marginTop: 18, backgroundColor: theme.colors.primary, borderRadius: 8, paddingVertical: 10, alignItems: 'center' }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 12,
    paddingVertical: 28,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#23233A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  headerTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  confidenceBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  confidenceText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default RecommendationCard; 