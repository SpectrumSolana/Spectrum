import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

interface NFTDisplayCardProps {
  collection: string;
  nfts: { image: string }[];
  holdingTime: string;
}

const NFTDisplayCard: React.FC<NFTDisplayCardProps> = ({ collection, nfts, holdingTime }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>NFT DISPLAY</Text>
    <View style={styles.rowBetween}>
      <Text style={styles.nftCollection}>{collection}</Text>
      <Text style={styles.nftCount}>{nfts.length}</Text>
    </View>
    <View style={styles.nftRow}>
      {nfts.map((nft, idx) => (
        <Image key={idx} source={nft.image} style={styles.nftImage} />
      ))}
    </View>
    <View style={styles.rowBetween}>
      <Text style={styles.label}>HOLDING TIME</Text>
      <Text style={styles.value}>{holdingTime}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  cardTitle: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 8,
    letterSpacing: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  nftCollection: {
    color: theme.colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 1,
  },
  nftCount: {
    color: theme.colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 13,
  },
  nftRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 8,
  },
  nftImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: theme.colors.surface,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  value: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NFTDisplayCard; 