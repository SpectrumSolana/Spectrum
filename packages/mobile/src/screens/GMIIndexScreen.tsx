import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BaseScreen from '../components/BaseScreen';
import { TEST_IDS } from '../navigation/constants';
import { theme } from '../theme/theme';
import InfoCard from '../components/InfoCard';
import Section from '../components/Section';
import GMIChart from '../components/GMIChart';
import InsightsModal from '../components/InsightsModal';
import { useFab } from '../navigation/components/CustomTabBar';

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

const GMIIndexScreen: React.FC = () => {
  const { isModalVisible, setIsModalVisible } = useFab();
  const insights = "The GMI Index is your personal Web3 score. It measures your portfolio diversity, DeFi usage, NFT activity, risk profile, and learning progress. Higher scores indicate better Web3 adoption and understanding.";

  return (
    <BaseScreen testID={TEST_IDS.GMI_INDEX_SCREEN}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>GMI Index</Text>
        <View style={{ height: 8 }} />
        <Section title="GMI INDEX CHART">
          <GMIChart />
        </Section>
        <View style={styles.sectionSpacer} />
        <Section title="PORTFOLIO DIVERSITY">
          <InfoCard style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>TOTAL VALUE</Text>
              <Text style={styles.value}>$12,450</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>ASSETS</Text>
              <Text style={styles.value}>8</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>CHAINS</Text>
              <Text style={styles.value}>3</Text>
            </View>
          </InfoCard>
        </Section>
        <View style={styles.sectionSpacer} />
        <Section title="DEFI USAGE">
          <InfoCard style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>PROTOCOLS</Text>
              <Text style={styles.value}>5</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>TOTAL VALUE LOCKED</Text>
              <Text style={styles.value}>$8,200</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>YIELD EARNED</Text>
              <Text style={styles.value}>$320</Text>
            </View>
          </InfoCard>
        </Section>
        <View style={styles.sectionSpacer} />
        <Section title="NFT ACTIVITY">
          <InfoCard style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>COLLECTIONS</Text>
              <Text style={styles.value}>3</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>TOTAL NFTS</Text>
              <Text style={styles.value}>12</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>AVG HOLDING TIME</Text>
              <Text style={styles.value}>45 days</Text>
            </View>
          </InfoCard>
        </Section>
        <View style={styles.sectionSpacer} />
        <Section title="RISK PROFILE">
          <InfoCard style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>RISK SCORE</Text>
              <Text style={styles.value}>65/100</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>VOLATILITY</Text>
              <Text style={styles.value}>Medium</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>DIVERSIFICATION</Text>
              <Text style={styles.value}>High</Text>
            </View>
          </InfoCard>
        </Section>
        <View style={styles.sectionSpacer} />
        <Section title="LEARNING & GROWTH">
          <InfoCard style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>KNOWLEDGE LEVEL</Text>
              <Text style={styles.value}>48/100</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>COMPLETED MISSIONS</Text>
              <Text style={styles.value}>12</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>COMMUNITY PARTICIPATION</Text>
              <Text style={styles.value}>100%</Text>
            </View>
          </InfoCard>
        </Section>
        <View style={styles.sectionSpacer} />
        <Section title="TRANSACTION ACTIVITY">
          <InfoCard style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>TOTAL TRANSACTIONS</Text>
              <Text style={styles.value}>156</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>SUCCESS RATE</Text>
              <Text style={styles.value}>98%</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.label}>AVG GAS USED</Text>
              <Text style={styles.value}>45,000</Text>
            </View>
          </InfoCard>
        </Section>
        <InsightsModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title="GMI Index Insights"
          insights={insights}
        />
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
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 100,
  },
  sectionSpacer: {
    height: 18,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  value: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.l,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    marginBottom: 0,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 0,
    marginTop: 4,
    textAlign: 'left',
  },
});

export default GMIIndexScreen; 