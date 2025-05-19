import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DelayQuestion as DelayQuestionType } from '../types';
import { Theme } from '../../../theme/theme';
import { STRINGS } from '../../../constants/strings';

// Constants
const TEST_IDS = {
  CONTAINER: 'delay-question-container',
  PROGRESS: 'delay-question-progress',
  QUESTION: 'delay-question-text',
  IMMEDIATE_BUTTON: 'delay-question-immediate-button',
  DELAYED_BUTTON: 'delay-question-delayed-button',
} as const;

const ACCESSIBILITY = {
  CONTAINER: {
    accessible: true,
    accessibilityRole: 'none',
  },
  PROGRESS: {
    accessible: true,
    accessibilityRole: 'text',
  },
  QUESTION: {
    accessible: true,
    accessibilityRole: 'text',
  },
  IMMEDIATE_BUTTON: {
    accessible: true,
    accessibilityRole: 'button',
    accessibilityHint: 'Select immediate reward',
  },
  DELAYED_BUTTON: {
    accessible: true,
    accessibilityRole: 'button',
    accessibilityHint: 'Select delayed reward',
  },
} as const;

interface DelayQuestionProps {
  question: DelayQuestionType;
  onSelect: (choice: 'immediate' | 'delayed') => void;
  progress: {
    current: number;
    total: number;
  };
  testID?: string;
}

export const DelayQuestion: React.FC<DelayQuestionProps> = ({ 
  question, 
  onSelect, 
  progress,
  testID = TEST_IDS.CONTAINER,
}) => {
  const handleImmediateSelect = useCallback(() => {
    onSelect('immediate');
  }, [onSelect]);

  const handleDelayedSelect = useCallback(() => {
    onSelect('delayed');
  }, [onSelect]);

  const progressText = useMemo(() => 
    STRINGS.QUESTION_PROGRESS
      .replace('{current}', progress.current.toString())
      .replace('{total}', progress.total.toString()),
    [progress.current, progress.total]
  );

  const questionText = useMemo(() => 
    STRINGS.DELAY_QUESTION
      .replace('{immediate}', question.immediate.toString())
      .replace('{delayed}', question.delayed.toString())
      .replace('{delay}', question.delay.toString()),
    [question.immediate, question.delayed, question.delay]
  );

  const immediateOptionText = useMemo(() => 
    STRINGS.IMMEDIATE_OPTION.replace('{amount}', question.immediate.toString()),
    [question.immediate]
  );

  const delayedOptionText = useMemo(() => 
    STRINGS.DELAYED_OPTION
      .replace('{amount}', question.delayed.toString())
      .replace('{delay}', question.delay.toString()),
    [question.delayed, question.delay]
  );

  return (
    <View 
      padding="m" 
      backgroundColor="cardBackground"
      borderRadius="m"
      shadowColor="shadow"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={3}
      testID={testID}
      {...ACCESSIBILITY.CONTAINER}
    >
      <Text 
        variant="caption" 
        color="textSecondary" 
        marginBottom="s"
        textAlign="center"
        testID={`${testID}-progress`}
        {...ACCESSIBILITY.PROGRESS}
      >
        {progressText}
      </Text>

      <Text 
        variant="header" 
        color="textPrimary" 
        marginBottom="l"
        textAlign="center"
        testID={`${testID}-question`}
        {...ACCESSIBILITY.QUESTION}
      >
        {questionText}
      </Text>

      <View gap="s">
        <TouchableOpacity
          onPress={handleImmediateSelect}
          backgroundColor="primary"
          padding="m"
          borderRadius="s"
          alignItems="center"
          testID={`${testID}-immediate`}
          accessibilityLabel={immediateOptionText}
          {...ACCESSIBILITY.IMMEDIATE_BUTTON}
        >
          <Text variant="body" color="textLight">
            {immediateOptionText}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelayedSelect}
          backgroundColor="primary"
          padding="m"
          borderRadius="s"
          alignItems="center"
          testID={`${testID}-delayed`}
          accessibilityLabel={delayedOptionText}
          {...ACCESSIBILITY.DELAYED_BUTTON}
        >
          <Text variant="body" color="textLight">
            {delayedOptionText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}; 