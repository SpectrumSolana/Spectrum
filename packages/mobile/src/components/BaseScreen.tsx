import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';

interface BaseScreenProps {
  children: React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  testID?: string;
}

const BaseScreen: React.FC<BaseScreenProps> = ({
  children,
  isLoading = false,
  error = null,
  testID,
}) => {
  return (
    <SafeAreaView style={styles.container} testID={testID}>
      {isLoading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#7B6FF0" />
        </View>
      ) : error ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        children
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#FF3B30',
  },
});

export default BaseScreen; 