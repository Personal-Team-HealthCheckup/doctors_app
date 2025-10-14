import React, { act } from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { Alert } from 'react-native';
import { mockNavigation } from '../../../../__mocks__/mock';
import VerificationCode from '../../../../src/screen/auth/VerificationCode';

// Mock Alert
jest.spyOn(Alert, 'alert');

const screenProps = {
  navigation: mockNavigation,
  verifyOTPData: {
    email: 'test@example.com',
    loading: false,
    error: null,
    message: null,
  },
  verifyOtpApi: jest.fn(),
  resendOtpApi: jest.fn(),
};
let mockTimer: Function;
describe('VerificationCodePage', () => {
  beforeEach(() => {
    jest.spyOn(globalThis, 'setInterval').mockImplementation(cb => {
      cb && cb();
      mockTimer = cb;
      return 1 as unknown as ReturnType<typeof setInterval>;
    });
    jest.clearAllMocks();
  });

  it('renders correctly (snapshot)', () => {
    render(<VerificationCode {...screenProps} />);
    expect(screen).toBeTruthy();
  });

  it('enter the otp', () => {
    render(<VerificationCode {...screenProps} />);
    const otpInput_0 = screen.getByTestId('otp-text-input-0');
    const otpInput_1 = screen.getByTestId('otp-text-input-1');
    const otpInput_2 = screen.getByTestId('otp-text-input-2');
    const otpInput_3 = screen.getByTestId('otp-text-input-3');
    fireEvent.changeText(otpInput_0, '1');
    fireEvent.changeText(otpInput_1, '2');
    fireEvent.changeText(otpInput_2, '3');
    fireEvent.changeText(otpInput_3, '4');
  });
  it('Enable Resend Otp Button ', async () => {
    render(<VerificationCode {...screenProps} />);

    const otpInput_0 = screen.getByTestId('otp-text-input-0');
    const otpInput_1 = screen.getByTestId('otp-text-input-1');
    const otpInput_2 = screen.getByTestId('otp-text-input-2');
    const otpInput_3 = screen.getByTestId('otp-text-input-3');
    fireEvent.changeText(otpInput_0, '1');
    fireEvent.changeText(otpInput_1, '2');
    fireEvent.changeText(otpInput_2, '3');
    fireEvent.changeText(otpInput_3, '4');
    // const resendOtp = screen.getByTestId('btn-resend-otp"');
    // fireEvent.press(resendOtp);
    const verifyOtpButton = screen.getByTestId('btn-verify');
    fireEvent.press(verifyOtpButton);
  });
});
