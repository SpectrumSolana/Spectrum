import React, { createContext, useContext, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Platform, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { TAB_NAMES, TEST_IDS, ACCESSIBILITY_LABELS } from '../constants';

// Create a context for the FAB state
export const FabContext = createContext<{
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
}>({
  isModalVisible: false,
  setIsModalVisible: () => {},
});

export const useFab = () => useContext(FabContext);

// Use supported FontAwesome5 icon names
const TAB_ICONS = {
  PROFILE: 'user',
  LEARNING: 'graduation-cap',
  GMI_INDEX: 'wave-square',
  CHAIN: 'link',
};

const TABS = [
  { key: 'PROFILE', label: 'PROFILE', icon: TAB_ICONS.PROFILE },
  { key: 'LEARNING', label: 'LEARNING', icon: TAB_ICONS.LEARNING },
  { key: 'GMI_INDEX', label: 'GMI INDEX', icon: TAB_ICONS.GMI_INDEX },
  { key: 'CHAIN', label: 'CHAIN', icon: TAB_ICONS.CHAIN },
];

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { isModalVisible, setIsModalVisible } = useFab();

  return (
    <View style={styles.wrapper}>
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => setIsModalVisible(true)}
        accessibilityLabel="Magic Action"
        testID="fab-magic"
      >
        <View style={styles.fabInner}>
          <FontAwesome5
            name="magic"
            size={32}
            color="#fff"
            solid
          />
        </View>
      </TouchableOpacity>
      {/* Tab Bar */}
      <View style={styles.container} testID={TEST_IDS.TAB_BAR}>
        {TABS.map((tab, index) => {
          const isFocused = state.index === index;
          const route = state.routes[index];
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TouchableOpacity
              key={tab.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={ACCESSIBILITY_LABELS[`${tab.key}_TAB`]}
              testID={TEST_IDS[`${tab.key}_TAB`]}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <FontAwesome5
                name={tab.icon}
                size={28}
                color={isFocused ? '#fff' : '#A3A3C2'}
                solid
                style={isFocused ? styles.activeIcon : undefined}
              />
              <Text style={[styles.label, isFocused && styles.activeLabel]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(32, 30, 50, 0.98)',
    borderRadius: 24,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  label: {
    fontSize: 11,
    color: '#A3A3C2',
    marginTop: 2,
    fontWeight: '600',
    letterSpacing: 1,
  },
  activeLabel: {
    color: '#fff',
  },
  activeIcon: {
    color: '#fff',
  },
  fab: {
    position: 'absolute',
    top: -88,
    right: 24,
    zIndex: 10,
    shadowColor: '#7B6FF0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  fabInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#23233A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#7B6FF0',
    overflow: 'hidden',
  },
});

export default CustomTabBar; 