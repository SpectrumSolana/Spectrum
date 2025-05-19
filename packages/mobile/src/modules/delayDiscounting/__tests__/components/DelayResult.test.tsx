import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DelayResult } from '../../components/DelayResult';

describe('DelayResult', () => {
  const mockResult = {
    kValue: 0.015,
    interpretation: 'Moderate discounting – you balance short- and long-term goals.',
    profile: 'Moderate' as const
  };

  const mockOnReset = jest.fn();

  it('renders correctly with result data', () => {
    const { getByText } = render(
      <DelayResult result={mockResult} onReset={mockOnReset} />
    );

    expect(getByText('Your Delay Discounting Profile')).toBeTruthy();
    expect(getByText('K-Value:')).toBeTruthy();
    expect(getByText('0.0150')).toBeTruthy();
    expect(getByText('Profile:')).toBeTruthy();
    expect(getByText('Moderate')).toBeTruthy();
    expect(getByText(mockResult.interpretation)).toBeTruthy();
  });

  it('applies correct styling based on profile', () => {
    const { getByText } = render(
      <DelayResult result={mockResult} onReset={mockOnReset} />
    );

    const profileText = getByText('Moderate');
    expect(profileText.props.style).toContainEqual(
      expect.objectContaining({
        backgroundColor: '#FFF4E5',
        color: '#FF9500'
      })
    );
  });

  it('calls onReset when reset button is pressed', () => {
    const { getByText } = render(
      <DelayResult result={mockResult} onReset={mockOnReset} />
    );

    fireEvent.press(getByText('Try Again'));
    expect(mockOnReset).toHaveBeenCalled();
  });
}); 