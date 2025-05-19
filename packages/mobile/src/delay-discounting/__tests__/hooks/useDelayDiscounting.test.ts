import { renderHook, act } from '@testing-library/react-hooks';
import { useDelayDiscounting } from '../../hooks/useDelayDiscounting';
import { DEFAULT_QUESTIONS } from '../../types';

describe('useDelayDiscounting', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with first question', () => {
    const { result } = renderHook(() => useDelayDiscounting());

    expect(result.current.currentQuestion).toEqual(DEFAULT_QUESTIONS[0]);
    expect(result.current.isComplete).toBe(false);
    expect(result.current.result).toBeNull();
    expect(result.current.progress).toEqual({
      current: 1,
      total: DEFAULT_QUESTIONS.length
    });
  });

  it('updates question when selecting immediate choice', () => {
    const { result } = renderHook(() => useDelayDiscounting());

    act(() => {
      result.current.handleSelect('immediate');
    });

    expect(result.current.currentQuestion).toEqual(DEFAULT_QUESTIONS[1]);
    expect(result.current.progress).toEqual({
      current: 2,
      total: DEFAULT_QUESTIONS.length
    });
  });

  // it('calculates result after last question', () => {
  //   const { result } = renderHook(() => useDelayDiscounting());
  //
  //   // Answer all questions with immediate choices
  //   act(() => {
  //     DEFAULT_QUESTIONS.forEach(() => {
  //       result.current.handleSelect('immediate');
  //     });
  //   });
  //
  //   expect(result.current.isComplete).toBe(true);
  //   expect(result.current.result).not.toBeNull();
  //   expect(result.current.result?.kValue).toBeGreaterThan(0);
  //   expect(result.current.result?.profile).toBeDefined();
  //   expect(result.current.result?.interpretation).toBeDefined();
  // });

  it('resets state when reset is called', () => {
    const { result } = renderHook(() => useDelayDiscounting());

    // Answer all questions
    act(() => {
      DEFAULT_QUESTIONS.forEach(() => {
        result.current.handleSelect('immediate');
      });
    });

    // Reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.currentQuestion).toEqual(DEFAULT_QUESTIONS[0]);
    expect(result.current.isComplete).toBe(false);
    expect(result.current.result).toBeNull();
    expect(result.current.progress).toEqual({
      current: 1,
      total: DEFAULT_QUESTIONS.length
    });
  });
}); 