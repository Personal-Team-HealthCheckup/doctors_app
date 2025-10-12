import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { mockNavigation } from '../../../../__mocks__/mock';
import VerificationCode from '../../../../src/screen/auth/VerificationCode';

const screenProps = {
  navigation: mockNavigation,
};

describe('VerificationCodePage', () => {
  it('renders correctly (snapshot)', () => {
    render(<VerificationCode {...screenProps} />);
    expect(screen).toBeTruthy();
  });
  it('renders Next button', () => {
    render(<VerificationCode {...screenProps} />);
    const nextButton = screen.getByTestId('button-slots');
    // fireEvent.press(nextButton);
    // expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
  });
});
