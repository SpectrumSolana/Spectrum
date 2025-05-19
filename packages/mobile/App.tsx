import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './src/navigation/MainNavigator';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { WalletProvider } from './src/modules/wallet/providers/WalletProvider';
import OnboardingFlow from './src/onboarding/OnboardingFlow';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <View style={landingStyles.container}>
      <Text style={landingStyles.title}>Welcome to Spectrum</Text>
      <Text style={landingStyles.subtitle}>Let's start by creating your profile. Tell us a bit about yourself so we can tailor you the best experience.</Text>
      <TouchableOpacity style={landingStyles.button} onPress={onStart}>
        <Text style={landingStyles.buttonText}>Let's go</Text>
      </TouchableOpacity>
    </View>
  );
}

function GeneratingProfileScreen({ onDone }: { onDone: () => void }) {
  React.useEffect(() => {
    const timer = setTimeout(onDone, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);
  return (
    <View style={landingStyles.container}>
      <Text style={{ fontSize: 64, marginBottom: 24 }}>⏳</Text>
      <Text style={landingStyles.title}>Spectrum is working...</Text>
      <Text style={landingStyles.subtitle}>Please, wait a second while our AI is creating your personalized experience.</Text>
      <ActivityIndicator size="large" color="#7B6FF0" style={{ marginTop: 24 }} />
    </View>
  );
}

function RootNavigator() {
  const { isAuthenticated, setIsAuthenticated, setOnboardingAnswers } = useAuth();
  const [started, setStarted] = useState(false);
  const [generating, setGenerating] = useState(false);
  if (!isAuthenticated) {
    if (!started) {
      return <LandingScreen onStart={() => setStarted(true)} />;
    }
    if (generating) {
      return <GeneratingProfileScreen onDone={() => { setGenerating(false); setIsAuthenticated(true); }} />;
    }
    return (
      <OnboardingFlow
        onFinish={(answers: Record<string, any>) => {
          setOnboardingAnswers(answers);
          setGenerating(true);
        }}
      />
    );
  }
  return <MainNavigator />;
}

const landingStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#14141F', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 16, textAlign: 'center' },
  subtitle: { color: '#A3A3C2', fontSize: 16, marginBottom: 32, textAlign: 'center' },
  button: { backgroundColor: '#23233A', borderRadius: 8, paddingVertical: 16, paddingHorizontal: 48 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <WalletProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <RootNavigator />
          </NavigationContainer>
        </WalletProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
} 