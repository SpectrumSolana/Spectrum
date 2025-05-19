export interface DelayQuestion {
  immediate: number;
  delayed: number;
  delay: number;
}

export interface DelayResponse extends DelayQuestion {
  choice: 'immediate' | 'delayed';
}

export interface DelayDiscountingResult {
  kValue: number;
  interpretation: string;
  profile: 'Low' | 'Moderate' | 'High';
}

export const DEFAULT_QUESTIONS: DelayQuestion[] = [
  { immediate: 10, delayed: 20, delay: 7 },
  { immediate: 15, delayed: 30, delay: 14 },
  { immediate: 20, delayed: 40, delay: 30 },
  { immediate: 30, delayed: 60, delay: 60 },
  { immediate: 50, delayed: 100, delay: 90 }
]; 