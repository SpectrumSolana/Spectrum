import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { MainTabScreenProps } from '../navigation/types';
import BaseScreen from '../components/BaseScreen';
import { TEST_IDS } from '../navigation/constants';
import { theme } from '../theme/theme';
import { useWallet } from '../modules/wallet/providers/WalletProvider';
import ProfileHeader from '../components/ProfileHeader';
import LearningRankingCard from '../components/LearningRankingCard';
import NFTDisplayCard from '../components/NFTDisplayCard';
import InsightsModal from '../components/InsightsModal';
import { useFab } from '../navigation/components/CustomTabBar';
import { useState } from 'react';
import { DelayQuestion } from '../modules/delayDiscounting/components/DelayQuestion';
import { DelayResult } from '../modules/delayDiscounting/components/DelayResult';
import PreferencesCard from '../components/PreferencesCard';
import { onboardingQuestions } from '../onboarding/questions';
import { useAuth } from '../context/AuthContext';

const profile = {
  avatar: require('../assets/profile/profilepicture.jpg'),
  username: 'ADER EGG',
  handle: '@0xegg',
  knowledgeLevel: 48,
  communityParticipation: '100%',
  nfts: [
    { image: require('../assets/profile/nft1.jpg') },
    { image: require('../assets/profile/nft2.jpg') },
    { image: require('../assets/profile/nft3.jpg') },
  ],
  collection: 'BORED APE YACHT CLUB',
  holdingTime: '189 days',
  category: 'Investor',
  confidence: 92,
};

const ProfileScreen: React.FC<MainTabScreenProps<'Profile'>> = () => {
  const { connected, publicKey } = useWallet();
  const { isModalVisible, setIsModalVisible } = useFab();
  const insights = "This is your profile summary. Here you can see your learning ranking, NFT collection, and more. Your knowledge level is based on your completed missions and community participation.";
  const [showDelayTest, setShowDelayTest] = useState(false);
  const [testStep, setTestStep] = useState(0);
  const [testResult, setTestResult] = useState(null);
  const { onboardingAnswers, setOnboardingAnswers } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAnswers, setEditAnswers] = useState(onboardingAnswers);

  // Handler for saving edited preferences
  const handleSavePreferences = () => {
    setOnboardingAnswers(editAnswers);
    setShowEditModal(false);
  };

  // Handler for changing an answer
  const handleChangeAnswer = (key: string, value: any) => {
    setEditAnswers((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <BaseScreen testID={TEST_IDS.PROFILE_SCREEN}>
      <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 100 }]} showsVerticalScrollIndicator={false}>
        <ProfileHeader avatar={profile.avatar} username={profile.username} handle={profile.handle} />
        <View style={styles.categoryRow}>
          <View style={[styles.categoryBadge, { backgroundColor: '#7ED957' }]}>
            <Text style={styles.categoryBadgeText}>{profile.category}</Text>
          </View>
          <View style={styles.confidenceBadge}>
            <Text style={styles.confidenceText}>{profile.confidence}% confidence</Text>
          </View>
        </View>
        <LearningRankingCard knowledgeLevel={profile.knowledgeLevel} communityParticipation={profile.communityParticipation} />
        <NFTDisplayCard collection={profile.collection} nfts={profile.nfts} holdingTime={profile.holdingTime} />

        {/* Preferences Card */}
        <PreferencesCard
          preferences={onboardingAnswers}
          questions={onboardingQuestions}
          onEdit={() => {
            setEditAnswers(onboardingAnswers);
            setShowEditModal(true);
          }}
        />

        {/* Edit Preferences Modal */}
        <Modal visible={showEditModal} animationType="slide" transparent onRequestClose={() => setShowEditModal(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(20,20,31,0.98)', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
            <View style={{ backgroundColor: theme.colors.cardBackground, borderRadius: 16, padding: 20, width: '100%', maxWidth: 360 }}>
              <Text style={{ color: theme.colors.textPrimary, fontWeight: 'bold', fontSize: 18, marginBottom: 16, textAlign: 'center' }}>Edit Preferences</Text>
              <ScrollView style={{ maxHeight: 340 }}>
                {onboardingQuestions.map((q) => (
                  <View key={q.key} style={{ marginBottom: 16 }}>
                    <Text style={{ color: theme.colors.textSecondary, fontSize: 14, marginBottom: 4 }}>{q.title}</Text>
                    {q.type === 'single' && q.options && (
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                        {q.options.map((opt: string) => (
                          <TouchableOpacity
                            key={opt}
                            style={{
                              backgroundColor: editAnswers[q.key] === opt ? theme.colors.primary : theme.colors.cardBackground,
                              borderColor: theme.colors.divider,
                              borderWidth: 1,
                              borderRadius: 8,
                              paddingVertical: 6,
                              paddingHorizontal: 12,
                              marginRight: 8,
                              marginBottom: 6,
                            }}
                            onPress={() => handleChangeAnswer(q.key, opt)}
                          >
                            <Text style={{ color: editAnswers[q.key] === opt ? '#fff' : theme.colors.textPrimary }}>{opt}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                    {q.type === 'multi' && q.options && (
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                        {q.options.map((opt: string) => {
                          const selected = Array.isArray(editAnswers[q.key]) && editAnswers[q.key].includes(opt);
                          return (
                            <TouchableOpacity
                              key={opt}
                              style={{
                                backgroundColor: selected ? theme.colors.primary : theme.colors.cardBackground,
                                borderColor: theme.colors.divider,
                                borderWidth: 1,
                                borderRadius: 8,
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                                marginRight: 8,
                                marginBottom: 6,
                              }}
                              onPress={() => {
                                let arr = Array.isArray(editAnswers[q.key]) ? [...editAnswers[q.key]] : [];
                                if (selected) {
                                  arr = arr.filter((v) => v !== opt);
                                } else {
                                  arr.push(opt);
                                }
                                handleChangeAnswer(q.key, arr);
                              }}
                            >
                              <Text style={{ color: selected ? '#fff' : theme.colors.textPrimary }}>{opt}</Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )}
                    {q.type === 'text' && (
                      <View style={{ borderWidth: 1, borderColor: theme.colors.divider, borderRadius: 8, backgroundColor: theme.colors.background }}>
                        <Text
                          style={{ color: theme.colors.textPrimary, fontSize: 15, padding: 10 }}
                          numberOfLines={1}
                        >
                          {/* Use a TextInput for editing */}
                        </Text>
                        <TouchableOpacity
                          style={{ position: 'absolute', right: 10, top: 10 }}
                          onPress={async () => {
                            // Prompt for text input (replace with a better UI as needed)
                            const newValue = prompt('Enter value:', editAnswers[q.key] || '');
                            if (newValue !== null) handleChangeAnswer(q.key, newValue);
                          }}
                        >
                          <Text style={{ color: theme.colors.primary }}>Edit</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ))}
              </ScrollView>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 18 }}>
                <TouchableOpacity
                  style={{ backgroundColor: theme.colors.divider, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 18, marginRight: 10 }}
                  onPress={() => setShowEditModal(false)}
                >
                  <Text style={{ color: theme.colors.textPrimary, fontWeight: 'bold', fontSize: 15 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ backgroundColor: theme.colors.primary, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 18 }}
                  onPress={handleSavePreferences}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>DELAY DISCOUNTING TEST</Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 14, marginBottom: 12 }}>
            Measure your impulsivity and patience. Take the test to see your profile!
          </Text>
          <TouchableOpacity
            style={{ backgroundColor: theme.colors.primary, borderRadius: 8, paddingVertical: 12, alignItems: 'center' }}
            onPress={() => setShowDelayTest(true)}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Take the Test</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={showDelayTest} animationType="slide" transparent onRequestClose={() => setShowDelayTest(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(20,20,31,0.98)', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
            <View style={{ backgroundColor: theme.colors.cardBackground, borderRadius: 16, padding: 20, width: '100%', maxWidth: 360 }}>
              <Text style={{ color: theme.colors.textPrimary, fontWeight: 'bold', fontSize: 18, marginBottom: 16, textAlign: 'center' }}>Delay Discounting Test (Coming Soon)</Text>
              <TouchableOpacity
                style={{ marginTop: 18, backgroundColor: theme.colors.primary, borderRadius: 8, paddingVertical: 10, alignItems: 'center' }}
                onPress={() => setShowDelayTest(false)}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Insights Modal */}
        <InsightsModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title="Profile Insights"
          insights={insights}
        />
      </ScrollView>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    color: theme.colors.textSecondary,
  },
  walletAddress: {
    marginTop: 16,
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontFamily: 'monospace',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 8,
  },
  categoryBadge: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 14,
    marginRight: 10,
    alignSelf: 'flex-start',
  },
  categoryBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  confidenceBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  confidenceText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
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
});

export default ProfileScreen; 