import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useDelayDiscounting } from '../hooks/useDelayDiscounting';
import DelayQuestion from '../components/DelayQuestion';
import DelayResults from '../components/DelayResults';
import { DEFAULT_QUESTIONS } from '../types';
import { theme } from '../../theme/theme';

const DelayDiscountingScreen: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { responses, addResponse, result } = useDelayDiscounting();

  const handleChoice = (choice: 'immediate' | 'delayed') => {
    const currentQuestion = DEFAULT_QUESTIONS[currentQuestionIndex];
    addResponse({
      ...currentQuestion,
      choice,
    });

    if (currentQuestionIndex < DEFAULT_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const isComplete = currentQuestionIndex >= DEFAULT_QUESTIONS.length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {!isComplete ? (
          <DelayQuestion
            question={DEFAULT_QUESTIONS[currentQuestionIndex]}
            onChoice={handleChoice}
          />
        ) : (
          result && <DelayResults result={result} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.padding,
    justifyContent: 'center',
  },
});

export default DelayDiscountingScreen; 