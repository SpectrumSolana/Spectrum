import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

describe('Minimal React Native Test', () => {
  it('renders a View component', () => {
    const { getByTestId } = render(<View testID="test-view" />);
    expect(getByTestId('test-view')).toBeTruthy();
  });
}); 