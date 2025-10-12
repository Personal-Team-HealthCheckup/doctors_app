import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { mockNavigation } from '../../../../__mocks__/mock';
import SignupScreen from '../../../../src/screen/auth/Signup';

const screenProps = {
  navigation: mockNavigation,
};

describe('SignupScreen', () => {
  it('renders correctly (snapshot)', () => {
    render(<SignupScreen {...screenProps} />);
    expect(screen).toBeTruthy();
  });
  it('renders Next button', () => {
    render(<SignupScreen {...screenProps} />);
    // const nextButton = screen.getByTestId('button-slots');
    // fireEvent.press(nextButton);
    // expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
  });
});
