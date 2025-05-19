import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DelayQuestion as DelayQuestionType } from '../types';

interface DelayQuestionProps {
  question: DelayQuestionType;
  onChoice: (choice: 'immediate' | 'delayed') => void;
}

const DelayQuestion: React.FC<DelayQuestionProps> = ({ question, onChoice }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your preference:</Text>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={styles.option} 
          onPress={() => onChoice('immediate')}
        >
          <Text style={styles.amount}>${question.immediate}</Text>
          <Text style={styles.label}>Now</Text>
        </TouchableOpacity>

        <Text style={styles.or}>OR</Text>

        <TouchableOpacity 
          style={styles.option} 
          onPress={() => onChoice('delayed')}
        >
          <Text style={styles.amount}>${question.delayed}</Text>
          <Text style={styles.label}>In {question.delay} days</Text>
        </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  option: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  or: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#95a5a6',
    marginHorizontal: 10,
  },
});

export default DelayQuestion; 