import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BaseScreen from '../components/BaseScreen';
import { TEST_IDS } from '../navigation/constants';
import MissionProgress from '../components/MissionProgress';
import { theme } from '../theme/theme';
import InsightsModal from '../components/InsightsModal';
import { useFab } from '../navigation/components/CustomTabBar';

const activeMissions = [
  {
    title: 'DEFI FOUNDATIONS',
    current: 3,
    total: 5,
    color: '#7ED957', // green
  },
  {
    title: 'NFT EXPLORATION',
    current: 1,
    total: 5,
    color: '#FFD057', // yellow
  },
];

const pastMissions = [
  { title: 'DECENTRALIZATION', current: 5, total: 5 },
  { title: 'BULL AND BEAR', current: 5, total: 5 },
  { title: 'READING GRAPHICS', current: 5, total: 5 },
];

const LearningScreen: React.FC = () => {
  const { isModalVisible, setIsModalVisible } = useFab();
  const insights = "This screen shows your learning progress, active and past missions. Complete missions to increase your knowledge level and unlock new content.";

  return (
    <BaseScreen testID={TEST_IDS.LEARNING_SCREEN}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Learning</Text>
        <View style={styles.divider} />
        <Text style={styles.subtitle}>Learn stuff that can help you.</Text>
        <View style={{ height: 16 }} />
        {activeMissions.map((mission, idx) => (
          <MissionProgress
            key={mission.title}
            title={mission.title}
            progress={mission.current / mission.total}
            current={mission.current}
            total={mission.total}
            active
            color={mission.color}
          />
        ))}
        <Text style={styles.pastTitle}>PAST MISSIONS</Text>
        {pastMissions.map((mission) => (
          <MissionProgress
            key={mission.title}
            title={mission.title}
            progress={1}
            current={mission.current}
            total={mission.total}
          />
        ))}
        {/* Insights Modal */}
        <InsightsModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title="Learning Insights"
          insights={insights}
        />
      </ScrollView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 100,
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
  pastTitle: {
    color: '#A3A3C2',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 18,
    marginBottom: 8,
    textAlign: 'left',
  },
});

export default LearningScreen; 