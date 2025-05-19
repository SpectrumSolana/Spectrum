import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DelayQuestion } from '../../components/DelayQuestion';

describe('DelayQuestion', () => {
  const mockQuestion = {
    immediate: 10,
    delayed: 20,
    delay: 7
  };

  const mockOnSelect = jest.fn();
  const mockProgress = {
    current: 1,
    total: 5
  };

  it('renders correctly with question data', () => {
    const { getByText } = render(
      <DelayQuestion
        question={mockQuestion}
        onSelect={mockOnSelect}
        progress={mockProgress}
      />
    );

    expect(getByText('Question 1 of 5')).toBeTruthy();
    expect(getByText('Would you prefer $10 now or $20 in 7 days?')).toBeTruthy();
    expect(getByText('$10 now')).toBeTruthy();
    expect(getByText('$20 in 7 days')).toBeTruthy();
  });

  it('calls onSelect with immediate when first button is pressed', () => {
    const { getByText } = render(
      <DelayQuestion
        question={mockQuestion}
        onSelect={mockOnSelect}
        progress={mockProgress}
      />
    );

    fireEvent.press(getByText('$10 now'));
    expect(mockOnSelect).toHaveBeenCalledWith('immediate');
  });

  it('calls onSelect with delayed when second button is pressed', () => {
    const { getByText } = render(
      <DelayQuestion
        question={mockQuestion}
        onSelect={mockOnSelect}
        progress={mockProgress}
      />
    );

    fireEvent.press(getByText('$20 in 7 days'));
    expect(mockOnSelect).toHaveBeenCalledWith('delayed');
  });
}); 