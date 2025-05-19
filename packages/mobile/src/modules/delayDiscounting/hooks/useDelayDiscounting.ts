import { useState } from 'react';
import { DEFAULT_QUESTIONS, DelayQuestion, DelayResponse, DelayDiscountingResult } from '../types';
import { calculateKValue } from '../utils/calculations';

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

  return {
    currentQuestion: DEFAULT_QUESTIONS[currentIndex],
    isComplete: result !== null,
    result,
    handleSelect,
    reset,
    progress: {
      current: currentIndex + 1,
      total: DEFAULT_QUESTIONS.length
    }
  };
}; 