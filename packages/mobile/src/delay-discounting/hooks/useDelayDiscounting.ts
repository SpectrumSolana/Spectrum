import { useState, useCallback, useMemo } from 'react';
import { DEFAULT_QUESTIONS, DelayQuestion, DelayResponse, DelayDiscountingResult } from '../types';

export const useDelayDiscounting = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<DelayResponse[]>([]);
  const [result, setResult] = useState<DelayDiscountingResult | null>(null);

  const handleSelect = (choice: 'immediate' | 'delayed') => {
    const currentQuestion = DEFAULT_QUESTIONS[currentIndex];
    const newResponses = [...responses, { ...currentQuestion, choice }];

    if (currentIndex < DEFAULT_QUESTIONS.length - 1) {
      setResponses(newResponses);
      setCurrentIndex(currentIndex + 1);
    } else {
      const finalResult = calculateKValue(newResponses);
      setResult(finalResult);
      // TODO: Send result to backend
      // await sendToBackend(finalResult);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setResponses([]);
    setResult(null);
  };

  const addResponse = useCallback((response: DelayResponse) => {
    setResponses(prev => [...prev, response]);
  }, []);

  const calculateKValue = useCallback((responses: DelayResponse[]): number => {
    // Simple implementation of k-value calculation
    // In a real implementation, this would use more sophisticated methods
    const immediateChoices = responses.filter(r => r.choice === 'immediate').length;
    const totalChoices = responses.length;
    
    return immediateChoices / totalChoices;
  }, []);

  const interpretResults = useCallback((kValue: number): DelayDiscountingResult => {
    let profile: 'Low' | 'Moderate' | 'High';
    let interpretation: string;

    if (kValue < 0.3) {
      profile = 'Low';
      interpretation = 'You show a strong preference for delayed rewards, indicating good impulse control and future-oriented thinking.';
    } else if (kValue < 0.7) {
      profile = 'Moderate';
      interpretation = 'You show a balanced approach to immediate and delayed rewards, with moderate discounting of future rewards.';
    } else {
      profile = 'High';
      interpretation = 'You show a strong preference for immediate rewards, indicating a higher tendency to discount future rewards.';
    }

    return {
      kValue,
      profile,
      interpretation,
    };
  }, []);

  const kValueResult = useMemo(() => {
    if (responses.length === 0) return null;
    
    const kValue = calculateKValue(responses);
    const profile = interpretResults(kValue);
    
    return {
      kValue,
      profile,
      responses
    };
  }, [responses]);

  return {
    currentQuestion: DEFAULT_QUESTIONS[currentIndex],
    isComplete: result !== null,
    result,
    handleSelect,
    reset,
    progress: {
      current: currentIndex + 1,
      total: DEFAULT_QUESTIONS.length
    },
    responses,
    addResponse,
  };
}; 