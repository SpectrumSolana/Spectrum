import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import BaseScreen from '../components/BaseScreen';
import InfoCard from '../components/InfoCard';
import Section from '../components/Section';
import { TEST_IDS } from '../navigation/constants';
import { theme } from '../theme/theme';

const mockPortfolio = {
  assetDiversity: '40.0%',
  holdingPeriod: '45 days',
  profitLoss: '$0.30',
  value: '5.45',
};

const mockDeFi = {
  tvl: '$0.80',
  protocolsUsed: '40.0%',
  yieldFarming: true,
  lending: true,
};

const mockNFT = {
  totalOwned: 4,
  avgHolding: '32 days',
};

const mockRisk = {
  riskTolerance: 'medium',
  leverage: false,
  insurance: '$0.34',
};

const mockLearning = {
  knowledge: 1,
  exp: 60,
  community: '0.32%',
  governance: '0.20%',
};

const mockTxs = Array(6).fill({
  hash: 'adwui...a2',
  from: 'adwuiga2',
  to: 'adwuiga2',
  value: '$20.00',
  status: 'done',
});

const HomeScreen: React.FC = () => {
  return (
    <BaseScreen testID={TEST_IDS.HOME_SCREEN}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.gmiTitle}>The GMI Index</Text>
        <Text style={styles.gmiSubtitle}>Welcome to the Spectrum, <Text style={styles.bold}>David</Text>.</Text>
        <Section title="Portfolio">
          <InfoCard>
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.portfolioValue}>{mockPortfolio.value}</Text>
              </View>
              <View>
                <Text style={styles.portfolioLabel}>ASSET DIVERSITY</Text>
                <Text style={styles.portfolioData}>{mockPortfolio.assetDiversity}</Text>
                <Text style={styles.portfolioLabel}>HOLDING PERIOD</Text>
                <Text style={styles.portfolioData}>{mockPortfolio.holdingPeriod}</Text>
                <Text style={styles.portfolioLabel}>PROFIT / LOSS</Text>
                <Text style={styles.portfolioData}>{mockPortfolio.profitLoss}</Text>
              </View>
            </View>
          </InfoCard>
        </Section>
        <Section title="DeFi Usage">
          <InfoCard>
            <Text style={styles.label}>TOTAL VALUE LOCKED</Text>
            <Text style={styles.value}>{mockDeFi.tvl}</Text>
            <Text style={styles.label}>PROTOCOLS USED</Text>
            <Text style={styles.value}>{mockDeFi.protocolsUsed}</Text>
            <Text style={styles.label}>YIELD FARMING</Text>
            <Text style={styles.value}>{mockDeFi.yieldFarming ? '✔️' : '❌'}</Text>
            <Text style={styles.label}>LENDING / BORROWING</Text>
            <Text style={styles.value}>{mockDeFi.lending ? '✔️' : '❌'}</Text>
          </InfoCard>
        </Section>
        <Section title="NFT Activity">
          <InfoCard>
            <Text style={styles.label}>TOTAL OWNED</Text>
            <Text style={styles.value}>{mockNFT.totalOwned}</Text>
            <View style={styles.nftRow}>
              {[...Array(4)].map((_, i) => (
                <View key={i} style={styles.nftBox} />
              ))}
            </View>
            <Text style={styles.label}>AVERAGE HOLDING TIME</Text>
            <Text style={styles.value}>{mockNFT.avgHolding}</Text>
          </InfoCard>
        </Section>
        <Section title="Risk Profile">
          <InfoCard>
            <Text style={styles.label}>RISK TOLERANCE</Text>
            <Text style={styles.value}>{mockRisk.riskTolerance}</Text>
            <Text style={styles.label}>LEVERAGE USAGE</Text>
            <Text style={styles.value}>{mockRisk.leverage ? '✔️' : '❌'}</Text>
            <Text style={styles.label}>INSURANCE COVERAGE</Text>
            <Text style={styles.value}>{mockRisk.insurance}</Text>
          </InfoCard>
        </Section>
        <Section title="Learning & Growth">
          <InfoCard>
            <Text style={styles.label}>KNOWLEDGE LEVEL <Text style={styles.exp}>(60 exp)</Text></Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBar, { width: '20%' }]} />
            </View>
            <Text style={styles.label}>COMMUNITY PARTICIPATION</Text>
            <Text style={styles.value}>{mockLearning.community}</Text>
            <Text style={styles.label}>GOVERNANCE PARTICIPATION</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBar, { width: '10%' }]} />
            </View>
            <Text style={styles.value}>{mockLearning.governance}</Text>
          </InfoCard>
        </Section>
        <Section title="Transaction Activity & History">
          <InfoCard>
            <View style={styles.txHeaderRow}>
              <Text style={styles.txHeader}>HASH</Text>
              <Text style={styles.txHeader}>FROM</Text>
              <Text style={styles.txHeader}>TO</Text>
              <Text style={styles.txHeader}>VALUE</Text>
              <Text style={styles.txHeader}>STATUS</Text>
            </View>
            <FlatList
              data={mockTxs}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => (
                <View style={styles.txRow}>
                  <Text style={styles.txCell}>{item.hash}</Text>
                  <Text style={styles.txCell}>{item.from}</Text>
                  <Text style={styles.txCell}>{item.to}</Text>
                  <Text style={styles.txCell}>{item.value}</Text>
                  <Text style={styles.txCell}>{item.status}</Text>
                </View>
              )}
              scrollEnabled={false}
            />
          </InfoCard>
        </Section>
      </ScrollView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.m,
    paddingBottom: 32,
  },
  gmiTitle: {
    color: '#fff',
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 8,
  },
  gmiSubtitle: {
    color: '#A3A3C2',
    fontSize: theme.fontSize.l,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
    color: '#fff',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  portfolioValue: {
    fontSize: 32,
    color: '#7B6FF0',
    fontWeight: 'bold',
    marginRight: 16,
  },
  portfolioLabel: {
    color: '#A3A3C2',
    fontSize: theme.fontSize.s,
    marginTop: 4,
  },
  portfolioData: {
    color: '#fff',
    fontSize: theme.fontSize.m,
    marginBottom: 2,
  },
  label: {
    color: '#A3A3C2',
    fontSize: theme.fontSize.s,
    marginTop: 4,
  },
  value: {
    color: '#fff',
    fontSize: theme.fontSize.m,
    marginBottom: 2,
  },
  nftRow: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  nftBox: {
    width: 40,
    height: 40,
    backgroundColor: '#23233A',
    borderRadius: 8,
    marginRight: 8,
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#23233A',
    borderRadius: 4,
    marginVertical: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#7B6FF0',
    borderRadius: 4,
  },
  exp: {
    color: '#7B6FF0',
    fontSize: theme.fontSize.s,
  },
  txHeaderRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  txHeader: {
    color: '#A3A3C2',
    fontSize: theme.fontSize.xs,
    fontWeight: 'bold',
    flex: 1,
  },
  txRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  txCell: {
    color: '#fff',
    fontSize: theme.fontSize.xs,
    flex: 1,
  },
});

export default HomeScreen; 