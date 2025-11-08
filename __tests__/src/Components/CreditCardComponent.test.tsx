import React from 'react';
import { render } from '@testing-library/react-native';
import CreditCardComponent from '../../../src/Components/CreditCardComponent';
import { Platform } from 'react-native';

describe('CreditCardComponent', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<CreditCardComponent />);
    expect(getByTestId).toBeTruthy();
  });

  it('renders on ios', () => {
    Platform.OS = 'ios';
    const component = render(<CreditCardComponent />);
    expect(component).toBeTruthy();
  });
});
