import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import WalletConnectScreen from '../screens/WalletConnectScreen';

export type OnboardingStackParamList = {
  Landing: undefined;
  WalletConnect: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'fade',
    }}
  >
    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="WalletConnect" component={WalletConnectScreen} />
  </Stack.Navigator>
);

export default OnboardingNavigator; 