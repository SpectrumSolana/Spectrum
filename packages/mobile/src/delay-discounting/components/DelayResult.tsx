import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DelayDiscountingResult } from '../types';
import { Theme } from '../../../theme/theme';
import { STRINGS } from '../../../constants/strings';

// Constants
const TEST_IDS = {
  CONTAINER: 'delay-result-container',
  TITLE: 'delay-result-title',
  K_VALUE: 'delay-result-k-value',
  IMPULSIVITY: 'delay-result-impulsivity',
  INTERPRETATION: 'delay-result-interpretation',
  RESET_BUTTON: 'delay-result-reset-button',
} as const;

const ACCESSIBILITY = {
  CONTAINER: {
    accessible: true,
    accessibilityRole: 'none',
  },
  TITLE: {
    accessible: true,
    accessibilityRole: 'header',
  },
  K_VALUE: {
    accessible: true,
    accessibilityRole: 'text',
  },
  IMPULSIVITY: {
    accessible: true,
    accessibilityRole: 'text',
  },
  INTERPRETATION: {
    accessible: true,
    accessibilityRole: 'text',
  },
  RESET_BUTTON: {
    accessible: true,
    accessibilityRole: 'button',
    accessibilityHint: 'Start the delay discounting test again',
  },
} as const;

type ProfileColor = {
  bg: keyof Theme['colors'];
  text: keyof Theme['colors'];
};

interface DelayResultProps {
  result: DelayDiscountingResult;
  onReset?: () => void;
  testID?: string;
}

export const DelayResult: React.FC<DelayResultProps> = ({ 
  result, 
  onReset,
  testID = TEST_IDS.CONTAINER,
}) => {
  const handleReset = useCallback(() => {
    onReset?.();
  }, [onReset]);

  const getProfileColor = useCallback((profile: string): ProfileColor => {
    switch (profile.toLowerCase()) {
      case 'low':
        return { bg: 'successLight', text: 'success' };
      case 'moderate':
        return { bg: 'warningLight', text: 'warning' };
      case 'high':
        return { bg: 'errorLight', text: 'error' };
      default:
        return { bg: 'textSecondary', text: 'textPrimary' };
    }
  }, []);

  const profileColors = useMemo(() => 
    getProfileColor(result.profile),
    [getProfileColor, result.profile]
  );

  const kValueText = useMemo(() => 
    STRINGS.K_VALUE.replace('{value}', result.kValue.toFixed(4)),
    [result.kValue]
  );

  const impulsivityText = useMemo(() => 
    STRINGS.IMPULSIVITY_LEVEL.replace('{level}', result.profile),
    [result.profile]
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
        variant="header" 
        color="textPrimary" 
        marginBottom="l"
        textAlign="center"
        testID={`${testID}-title`}
        {...ACCESSIBILITY.TITLE}
      >
        {STRINGS.RESULT_TITLE}
      </Text>

      <View 
        flexDirection="row" 
        justifyContent="center" 
        alignItems="center" 
        marginBottom="m"
      >
        <Text 
          variant="body" 
          color="textPrimary" 
          marginRight="s"
          testID={`${testID}-k-value`}
          {...ACCESSIBILITY.K_VALUE}
        >
          {kValueText}
        </Text>
      </View>

      <View 
        flexDirection="row" 
        justifyContent="center" 
        alignItems="center" 
        marginBottom="l"
      >
        <Text 
          variant="body" 
          color="textPrimary" 
          marginRight="s"
          testID={`${testID}-impulsivity`}
          {...ACCESSIBILITY.IMPULSIVITY}
        >
          {impulsivityText}
        </Text>
        <View 
          backgroundColor={profileColors.bg}
          paddingHorizontal="s"
          paddingVertical="xs"
          borderRadius="s"
        >
          <Text variant="body" color={profileColors.text}>
            {result.profile}
          </Text>
        </View>
      </View>

      <Text 
        variant="body" 
        color="textSecondary" 
        textAlign="center" 
        marginBottom="l"
        testID={`${testID}-interpretation`}
        {...ACCESSIBILITY.INTERPRETATION}
      >
        {result.interpretation}
      </Text>

      {onReset && (
        <TouchableOpacity
          onPress={handleReset}
          backgroundColor="primary"
          padding="m"
          borderRadius="s"
          alignItems="center"
          testID={`${testID}-reset`}
          accessibilityLabel={STRINGS.RESET_BUTTON}
          {...ACCESSIBILITY.RESET_BUTTON}
        >
          <Text variant="body" color="textLight">
            {STRINGS.RESET_BUTTON}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}; 