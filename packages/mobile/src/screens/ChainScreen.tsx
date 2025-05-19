import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BaseScreen from '../components/BaseScreen';
import { TEST_IDS } from '../navigation/constants';
import { theme } from '../theme/theme';
import ChainToolCard from '../components/ChainToolCard';
import InsightsModal from '../components/InsightsModal';
import { useFab } from '../navigation/components/CustomTabBar';
import RecommendationCard from '../components/RecommendationCard';

const tools = [
  {
    name: 'Aave V3',
    type: 'Lending',
    apy: '4.2%',
    apyColor: '#7ED957',
    expectedYield: '$120/year',
    riskLevel: 'Low',
    riskLevelColor: '#7ED957',
    complexity: 'Beginner',
    complexityColor: '#7ED957',
    leftButton: { label: 'Learn' },
    rightButton: { label: 'Try now', url: 'https://app.aave.com' },
    confidence: 92,
  },
  {
    name: 'Uniswap V3',
    type: 'DEX',
    apy: '12.5%',
    apyColor: '#FFD057',
    expectedYield: '$350/year',
    riskLevel: 'Medium',
    riskLevelColor: '#FFD057',
    complexity: 'Intermediate',
    complexityColor: '#FFD057',
    leftButton: { label: 'Learn' },
    rightButton: { label: 'Try now', url: 'https://app.uniswap.org' },
    confidence: 88,
  },
  {
    name: 'Curve Finance',
    type: 'Stable Swap',
    apy: '3.8%',
    apyColor: '#7ED957',
    expectedYield: '$95/year',
    riskLevel: 'Low',
    riskLevelColor: '#7ED957',
    complexity: 'Beginner',
    complexityColor: '#7ED957',
    leftButton: { label: 'Learn' },
    rightButton: { label: 'Try now', url: 'https://curve.fi' },
    confidence: 85,
  },
  {
    name: 'Compound V3',
    type: 'Lending',
    apy: '5.1%',
    apyColor: '#7ED957',
    expectedYield: '$150/year',
    riskLevel: 'Low',
    riskLevelColor: '#7ED957',
    complexity: 'Intermediate',
    complexityColor: '#FFD057',
    leftButton: { label: 'Learn' },
    rightButton: { label: 'Try now', url: 'https://app.compound.finance' },
    confidence: 80,
  },
  {
    name: 'Balancer V2',
    type: 'DEX',
    apy: '15.2%',
    apyColor: '#FF3B30',
    expectedYield: '$450/year',
    riskLevel: 'High',
    riskLevelColor: '#FF3B30',
    complexity: 'Advanced',
    complexityColor: '#FF3B30',
    leftButton: { label: 'Learn' },
    rightButton: { label: 'Try now', url: 'https://app.balancer.fi' },
    confidence: 75,
  },
];

const recommendations = {
  DeFi: [
    { name: 'Aave', description: 'Lend and borrow assets with low fees.', confidence: 92, url: 'https://app.aave.com' },
    { name: 'Uniswap', description: 'Swap tokens instantly with low slippage.', confidence: 88, url: 'https://app.uniswap.org' },
    { name: 'Jupiter', description: 'Best price aggregator for swaps.', confidence: 86, url: 'https://jup.ag' },
  ],
  NFTs: [
    { name: 'Magic Eden', description: 'Discover and trade top Solana NFTs.', confidence: 90, url: 'https://magiceden.io' },
    { name: 'OpenSea', description: 'The largest NFT marketplace.', confidence: 85, url: 'https://opensea.io' },
    { name: 'Tensor', description: 'Advanced NFT trading platform.', confidence: 80, url: 'https://tensor.trade' },
  ],
  DAOs: [
    { name: 'Squads', description: 'Collaborative treasury management.', confidence: 80, url: 'https://squads.so' },
    { name: 'Grape', description: "Solana's social DAO.", confidence: 78, url: 'https://grape.art' },
    { name: 'Superteam', description: 'DAO for builders and contributors.', confidence: 75, url: 'https://superteam.fun' },
  ],
  Trading: [
    { name: 'Mango Markets', description: 'Trade with leverage on Solana.', confidence: 84, url: 'https://trade.mango.markets' },
    { name: 'Drift Protocol', description: 'Decentralized perpetuals trading.', confidence: 82, url: 'https://app.drift.trade' },
    { name: 'Jupiter Aggregator', description: 'Best price aggregator for swaps.', confidence: 81, url: 'https://jup.ag' },
  ],
};

const categories = ['DeFi', 'NFTs', 'DAOs', 'Trading'];

const insightsByCategory = {
  DeFi: "Explore top DeFi protocols. Compare APY, risk, and complexity to find the best fit for your portfolio.",
  NFTs: "Discover NFT marketplaces and tools. Learn how to mint, trade, and showcase your digital assets.",
  DAOs: "Participate in decentralized organizations. Find DAOs for governance, collaboration, and community.",
  Trading: "Access trading platforms and aggregators. Compare fees, leverage, and supported assets.",
};

const ChainScreen: React.FC = () => {
  const { isModalVisible, setIsModalVisible } = useFab();
  const [selectedCategory, setSelectedCategory] = useState('DeFi');
  const insights = insightsByCategory[selectedCategory];

  return (
    <BaseScreen testID={TEST_IDS.CHAIN_SCREEN}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>On Chain</Text>
        <View style={styles.divider} />
        <Text style={styles.subtitle}>DeFi tools and protocols.</Text>
        <View style={{ height: 4 }} />
        {/* Centered Horizontal Category Selector at the top */}
        <View style={{ alignItems: 'center', marginVertical: 12 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 4 }}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={[
                  styles.categoryPill,
                  selectedCategory === cat && styles.categoryPillSelected,
                ]}
              >
                <Text
                  style={[
                    styles.categoryPillText,
                    selectedCategory === cat && styles.categoryPillTextSelected,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* Show DeFi tool cards if DeFi is selected, else show RecommendationCards */}
        {selectedCategory === 'DeFi' ? (
          tools.map((tool, index) => (
            <ChainToolCard
              key={tool.name}
              {...tool}
              style={index === tools.length - 1 ? { marginBottom: 0 } : undefined}
            />
          ))
        ) : (
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.categoryTitle}>{selectedCategory} Recommendations</Text>
            {recommendations[selectedCategory].map((rec) => (
              <RecommendationCard key={rec.name} name={rec.name} description={rec.description} confidence={rec.confidence} url={rec.url} />
            ))}
          </View>
        )}
        {/* Insights Modal */}
        <InsightsModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title={`${selectedCategory} Insights`}
          insights={insights}
        />
      </ScrollView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 8,
    paddingTop: 20,
    paddingBottom: 100, // ensure content is above the tab bar
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
    marginTop: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: 'rgba(163,163,194,0.15)',
    borderStyle: 'dotted',
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 18,
  },
  categoryTitle: {
    color: theme.colors.primary,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,
    letterSpacing: 1,
  },
  categoryPill: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginRight: 10,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  categoryPillSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryPillText: {
    color: theme.colors.textSecondary,
    fontWeight: '600',
    fontSize: 15,
  },
  categoryPillTextSelected: {
    color: '#fff',
  },
});

export default ChainScreen; 