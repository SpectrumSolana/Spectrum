import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { theme } from '../theme/theme';

interface InfoCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ children, style, testID, accessible, accessibilityLabel }) => {
  return (
    <View
      style={[styles.card, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
});

export default InfoCard; 