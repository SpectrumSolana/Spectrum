import { DelayResponse, DelayDiscountingResult } from '../../delay-discounting/types';

export const calculateKValue = (responses: DelayResponse[]): DelayDiscountingResult => {
  let totalK = 0;
  let count = 0;

  for (const response of responses) {
    if (response.choice === 'immediate') {
      // V = A / (1 + kD) => k = (A/V - 1) / D
      const k = ((response.delayed / response.immediate) - 1) / response.delay;
      totalK += k;
      count++;
    }
  }

  const avgK = count ? totalK / count : 0.0001; // Prevent zero

  let profile: 'Low' | 'Moderate' | 'High';
  let interpretation: string;

  if (avgK < 0.01) {
    profile = 'Low';
    interpretation = "Low discounting – you're patient and consider long-term rewards.";
  } else if (avgK < 0.03) {
    profile = 'Moderate';
    interpretation = "Moderate discounting – you balance short- and long-term goals.";
  } else {
    profile = 'High';
    interpretation = "High discounting – you tend to prioritize immediate rewards.";
  }

  return {
    kValue: avgK,
    interpretation,
    profile
  };
}; 