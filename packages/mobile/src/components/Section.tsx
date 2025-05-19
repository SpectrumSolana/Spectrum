import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { theme } from '../theme/theme';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, style, testID }) => {
  return (
    <View style={style} testID={testID} accessible accessibilityLabel={title}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#A3A3C2',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  content: {
    // for spacing
  },
});

export default Section; 