import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ViewStyle, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';
import { FontAwesome5 } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ChainToolCardProps {
  icon?: any; // Image source or React element
  name: string;
  type: string;
  apy: string;
  apyColor?: string;
  expectedYield: string;
  riskLevel: string;
  riskLevelColor?: string;
  complexity: string;
  complexityColor?: string;
  leftButton: { label: string; onPress?: () => void };
  rightButton: { label: string; onPress?: () => void; url?: string };
  style?: ViewStyle;
  leftButtonVariant?: 'primary' | 'secondary';
  confidence?: number;
}

const iconMap: { [key: string]: { name: string; color: string } } = {
  'Aave V3': { name: 'university', color: '#7ED957' },
  'Uniswap V3': { name: 'water', color: '#FFD057' },
  'Curve Finance': { name: 'chart-line', color: '#7B6FF0' },
  'Compound V3': { name: 'cubes', color: '#FFD057' },
  'Balancer V2': { name: 'balance-scale', color: '#FF3B30' },
};

const ChainToolCard: React.FC<ChainToolCardProps> = ({
  icon,
  name,
  type,
  apy,
  apyColor = '#A3A3C2',
  expectedYield,
  riskLevel,
  riskLevelColor = '#7ED957',
  complexity,
  complexityColor = '#A3A3C2',
  leftButton,
  rightButton,
  style,
  leftButtonVariant = 'primary',
  confidence,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleRightButtonPress = () => {
    if (rightButton.url) {
      navigation.navigate('WebView', {
        url: rightButton.url,
        title: name,
      });
    } else if (rightButton.onPress) {
      rightButton.onPress();
    }
  };

  const handleLearnPress = () => {
    setModalVisible(true);
  };

  // Example guidance per tool (can be expanded for each tool)
  const guidance: { [key: string]: string[] } = {
    'Aave V3': [
      '1. Connect your wallet to Aave.',
      '2. Select an asset to supply or borrow.',
      '3. Review APY and risk before confirming.',
      '4. Approve the transaction in your wallet.',
      '5. Track your position in the dashboard.'
    ],
    'Uniswap V3': [
      '1. Connect your wallet to Uniswap.',
      '2. Choose tokens to swap or provide liquidity.',
      '3. Set your slippage tolerance.',
      '4. Confirm the transaction in your wallet.',
      '5. View your liquidity positions.'
    ],
    'Curve Finance': [
      '1. Connect your wallet to Curve.',
      '2. Select a stablecoin pool.',
      '3. Deposit tokens to earn yield.',
      '4. Confirm the transaction in your wallet.',
      '5. Monitor your rewards.'
    ],
    'Compound V3': [
      '1. Connect your wallet to Compound.',
      '2. Supply or borrow supported assets.',
      '3. Review interest rates and risk.',
      '4. Confirm the transaction in your wallet.',
      '5. Track your supply/borrow balance.'
    ],
    'Balancer V2': [
      '1. Connect your wallet to Balancer.',
      '2. Choose a pool to provide liquidity.',
      '3. Review pool composition and APY.',
      '4. Confirm the transaction in your wallet.',
      '5. Monitor your pool share and rewards.'
    ],
  };

  const steps: string[] = guidance[name] || [
    '1. Connect your wallet.',
    '2. Follow the on-screen instructions.',
    '3. Confirm transactions in your wallet.',
    '4. Track your progress on the platform.'
  ];

  const iconInfo = iconMap[name] || { name: 'cube', color: theme.colors.primary };

  return (
    <View style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.type}>{type}</Text>
        </View>
        {confidence !== undefined && (
          <View style={styles.confidenceBadge}>
            <Text style={styles.confidenceText}>{confidence}% match</Text>
          </View>
        )}
      </View>
      <View style={styles.infoRow}>
        <View style={styles.icon}>
          <FontAwesome5 name={iconInfo.name as any} size={32} color={iconInfo.color} />
        </View>
        <View style={styles.statsBlock}>
          <View style={styles.statGridRow}>
            <Text style={styles.statLabelGrid}>APY</Text>
            <Text style={[styles.statValueGrid, { color: apyColor }]}>{apy}</Text>
          </View>
          <View style={styles.statGridRow}>
            <Text style={styles.statLabelGrid}>RISK LEVEL</Text>
            <Text style={[styles.statValueGrid, { color: riskLevelColor }]}>{riskLevel}</Text>
          </View>
          <View style={styles.statGridRow}>
            <Text style={styles.statLabelGrid}>COMPLEXITY</Text>
            <Text style={[styles.statValueGrid, { color: complexityColor }]}>{complexity}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.fullButton, leftButtonVariant === 'primary' ? styles.primaryButton : styles.secondaryButton]}
          onPress={handleLearnPress}
        >
          <Text style={styles.buttonText}>Learn</Text>
        </TouchableOpacity>
        <View style={{ width: 12 }} />
        <TouchableOpacity 
          style={[styles.button, styles.fullButton, styles.secondaryButton]} 
          onPress={handleRightButtonPress}
        >
          <Text style={styles.buttonText}>Try now</Text>
        </TouchableOpacity>
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#35354D',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  name: {
    color: '#7B6FF0',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  type: {
    color: '#A3A3C2',
    fontWeight: '600',
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  confidenceBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginLeft: 2,
    alignSelf: 'flex-start',
  },
  confidenceText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#23233A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  iconPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#23233A',
    marginRight: 20,
  },
  statsBlock: {
    flex: 2,
    justifyContent: 'center',
    marginLeft: 12,
    marginRight: 12,
  },
  statGridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabelGrid: {
    color: '#A3A3C2',
    fontSize: 12,
    fontWeight: '600',
    width: 110,
    marginRight: 8,
  },
  statValueGrid: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    flex: 1,
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#35354D',
    backgroundColor: 'transparent',
  },
  fullButton: {
    minWidth: 0,
  },
  primaryButton: {
    backgroundColor: '#23233A',
    borderColor: '#23233A',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: '#35354D',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});

export default ChainToolCard; 