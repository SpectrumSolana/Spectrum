import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from './types';
import { TAB_NAMES } from './constants';
import CustomTabBar, { FabContext } from './components/CustomTabBar';
import { theme } from '../theme/theme';

// Import screens
import ProfileScreen from '../screens/ProfileScreen';
import LearningScreen from '../screens/LearningScreen';
import GMIIndexScreen from '../screens/GMIIndexScreen';
import ChainScreen from '../screens/ChainScreen';
import WebViewScreen from '../screens/WebViewScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const TabNavigator = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <FabContext.Provider value={{ isModalVisible, setIsModalVisible }}>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name={TAB_NAMES.PROFILE} component={ProfileScreen} />
        <Tab.Screen name={TAB_NAMES.LEARNING} component={LearningScreen} />
        <Tab.Screen name={TAB_NAMES.GMI_INDEX} component={GMIIndexScreen} />
        <Tab.Screen name={TAB_NAMES.CHAIN} component={ChainScreen} />
      </Tab.Navigator>
    </FabContext.Provider>
  );
};

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Spectrum" component={TabNavigator} />
      <Stack.Screen 
        name="WebView" 
        component={WebViewScreen}
        options={({ route }) => ({
          headerShown: true,
          title: route.params.title,
          headerStyle: {
            backgroundColor: theme.colors.cardBackground,
          },
          headerTintColor: '#fff',
        })}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator; 