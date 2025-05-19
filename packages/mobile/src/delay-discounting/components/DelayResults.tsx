import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DelayDiscountingResult } from '../types';

interface DelayResultsProps {
  result: DelayDiscountingResult;
}

const DelayResults: React.FC<DelayResultsProps> = ({ result }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Results</Text>
      
      <View style={styles.resultContainer}>
        <View style={styles.resultItem}>
          <Text style={styles.label}>Discounting Rate (k-value)</Text>
          <Text style={styles.value}>{result.kValue.toFixed(4)}</Text>
        </View>

        <View style={styles.resultItem}>
          <Text style={styles.label}>Profile</Text>
          <Text style={[styles.value, styles[`profile${result.profile}`]]}>
            {result.profile}
          </Text>
        </View>

        <View style={styles.interpretationContainer}>
          <Text style={styles.interpretationLabel}>Interpretation</Text>
          <Text style={styles.interpretationText}>{result.interpretation}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  resultContainer: {
    gap: 20,
  },
  resultItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  profileLow: {
    color: '#27ae60',
  },
  profileModerate: {
    color: '#f39c12',
  },
  profileHigh: {
    color: '#e74c3c',
  },
  interpretationContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  interpretationLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  interpretationText: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
  },
});

export default DelayResults; 