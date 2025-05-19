import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../navigation/OnboardingNavigator';
import { theme } from '../theme/theme';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Landing'>;

const LandingScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://placehold.co/140x140/png' }} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>
        WELCOME TO THE{"\n"}
        <Text style={styles.bold}>SPECTRUM</Text>
      </Text>
      <View style={styles.divider} />
      <Text style={styles.subtitle}>
        SPECTRUM is a platform that helps new users onboard on the web3 environment.
      </Text>
      <View style={styles.divider} />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('WalletConnect')}
        >
          <Text style={styles.buttonText}>connect your wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Text style={styles.buttonText}>start</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.infoText}>if you already have an account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.horizontal,
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 32,
  },
  title: {
    color: '#fff',
    fontSize: theme.fontSize.title,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
  },
  bold: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: theme.fontSize.bold,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: 'rgba(163,163,194,0.15)',
    borderStyle: 'dotted',
    alignSelf: 'stretch',
    marginVertical: theme.spacing.vertical,
  },
  subtitle: {
    color: '#A3A3C2',
    fontSize: theme.fontSize.subtitle,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 8,
    gap: theme.spacing.gap,
  },
  button: {
    flex: 1,
    borderRadius: theme.borderRadius.button,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primaryButton: {
    backgroundColor: theme.colors.primaryButton,
    marginRight: theme.spacing.right,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: theme.colors.secondaryButton,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: theme.fontSize.buttonText,
    textTransform: 'lowercase',
    letterSpacing: 0.5,
  },
  infoText: {
    color: '#A3A3C2',
    fontSize: theme.fontSize.infoText,
    marginTop: theme.spacing.top,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default LandingScreen; 