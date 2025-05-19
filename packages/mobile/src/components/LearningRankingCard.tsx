import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

interface LearningRankingCardProps {
  knowledgeLevel: number;
  communityParticipation: string;
}

const LearningRankingCard: React.FC<LearningRankingCardProps> = ({ knowledgeLevel, communityParticipation }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>LEARNING RANKING</Text>
    <View style={styles.rowBetween}>
      <Text style={styles.label}>KNOWLEDGE LEVEL</Text>
      <Text style={styles.value}>{knowledgeLevel}</Text>
    </View>
    <View style={styles.rowBetween}>
      <Text style={styles.label}>COMMUNITY PARTICIPATION</Text>
      <Text style={[styles.value, { color: theme.colors.success }]}>{communityParticipation}</Text>
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
  label: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  value: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LearningRankingCard; 