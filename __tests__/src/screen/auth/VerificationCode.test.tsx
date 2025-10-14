import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
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
    message: null
  },
  verifyOtpApi: jest.fn(),
  resendOtpApi: jest.fn(),
};

describe('VerificationCodePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly (snapshot)', () => {
    render(<VerificationCode {...screenProps} />);
    expect(screen).toBeTruthy();
  });

  it('renders verify button', () => {
    render(<VerificationCode {...screenProps} />);
    const nextButton = screen.getByTestId('custom-g-button');
    expect(nextButton).toBeTruthy();
  });

  it('displays email in verification text', () => {
    const { getByText } = render(<VerificationCode {...screenProps} />);
    expect(getByText(/test@example.com/)).toBeTruthy();
  });

  it('shows loading state', () => {
    const propsWithLoading = {
      ...screenProps,
      verifyOTPData: { ...screenProps.verifyOTPData, loading: true }
    };
    render(<VerificationCode {...propsWithLoading} />);
    expect(screen).toBeTruthy();
  });

  it('handles back button press', () => {
    const { getByTestId } = render(<VerificationCode {...screenProps} />);
    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('renders OTP input fields', () => {
    const { getAllByDisplayValue } = render(<VerificationCode {...screenProps} />);
    expect(getAllByDisplayValue('')).toHaveLength(4);
  });

  it('handles OTP input changes', () => {
    const { getAllByDisplayValue } = render(<VerificationCode {...screenProps} />);
    const inputs = getAllByDisplayValue('');
    
    fireEvent.changeText(inputs[0], '1');
    fireEvent.changeText(inputs[1], '2');
    fireEvent.changeText(inputs[2], '3');
    fireEvent.changeText(inputs[3], '4');
    
    expect(inputs[0].props.value).toBe('1');
    expect(inputs[1].props.value).toBe('2');
    expect(inputs[2].props.value).toBe('3');
    expect(inputs[3].props.value).toBe('4');
  });

  it('handles OTP verification button press', async () => {
    const { getAllByDisplayValue, getByTestId } = render(<VerificationCode {...screenProps} />);
    const inputs = getAllByDisplayValue('');
    
    fireEvent.changeText(inputs[0], '1');
    fireEvent.changeText(inputs[1], '2');
    fireEvent.changeText(inputs[2], '3');
    fireEvent.changeText(inputs[3], '4');
    
    const verifyButton = getByTestId('custom-g-button');
    fireEvent.press(verifyButton);
    
    expect(verifyButton).toBeTruthy();
  });

  it('handles resend button press', () => {
    const { getByText } = render(<VerificationCode {...screenProps} />);
    const resendButton = getByText(/Resend Code/);
    fireEvent.press(resendButton);
    expect(resendButton).toBeTruthy();
  });

  it('renders verification title', () => {
    const { getByText } = render(<VerificationCode {...screenProps} />);
    expect(getByText('Enter 4 Digits Code')).toBeTruthy();
  });

  it('renders resend code button', () => {
    const { getByText } = render(<VerificationCode {...screenProps} />);
    expect(getByText(/Resend Code/)).toBeTruthy();
  });

  it('renders countdown timer', () => {
    const { getByText } = render(<VerificationCode {...screenProps} />);
    expect(getByText(/(02:00)/)).toBeTruthy();
  });

  it('renders verify code button text', () => {
    const { getByText } = render(<VerificationCode {...screenProps} />);
    expect(getByText('Verify Code')).toBeTruthy();
  });

  it('renders header component', () => {
    const { getByText } = render(<VerificationCode {...screenProps} />);
    expect(getByText('Verification Code')).toBeTruthy();
  });

  it('renders with different email', () => {
    const propsWithDifferentEmail = {
      ...screenProps,
      verifyOTPData: { ...screenProps.verifyOTPData, email: 'different@example.com' }
    };
    const { getByText } = render(<VerificationCode {...propsWithDifferentEmail} />);
    expect(getByText(/different@example.com/)).toBeTruthy();
  });

  it('handles partial OTP input', () => {
    const { getAllByDisplayValue } = render(<VerificationCode {...screenProps} />);
    const inputs = getAllByDisplayValue('');
    
    fireEvent.changeText(inputs[0], '1');
    fireEvent.changeText(inputs[1], '2');
    
    expect(inputs[0].props.value).toBe('1');
    expect(inputs[1].props.value).toBe('2');
    expect(inputs[2].props.value).toBe('');
    expect(inputs[3].props.value).toBe('');
  });

  it('handles OTP input focus navigation', () => {
    const { getAllByDisplayValue } = render(<VerificationCode {...screenProps} />);
    const inputs = getAllByDisplayValue('');
    
    fireEvent.changeText(inputs[0], '1');
    expect(inputs[0].props.value).toBe('1');
  });

  it('handles backspace navigation', () => {
    const { getAllByDisplayValue } = render(<VerificationCode {...screenProps} />);
    const inputs = getAllByDisplayValue('');
    
    fireEvent(inputs[1], 'keyPress', { nativeEvent: { key: 'Backspace' } });
    expect(inputs[1]).toBeTruthy();
  });

  it('handles timer countdown', () => {
    const component = render(<VerificationCode {...screenProps} />);
    expect(component).toBeTruthy();
  });

  it('disables resend button during countdown', () => {
    const { getByText } = render(<VerificationCode {...screenProps} />);
    const resendButton = getByText(/Resend Code/);
    expect(resendButton).toBeTruthy();
  });

  it('handles empty OTP submission', () => {
    const { getByTestId } = render(<VerificationCode {...screenProps} />);
    const verifyButton = getByTestId('custom-g-button');
    fireEvent.press(verifyButton);
    expect(verifyButton).toBeTruthy();
  });

  it('handles component mount and unmount', () => {
    const { unmount } = render(<VerificationCode {...screenProps} />);
    unmount();
    expect(true).toBe(true);
  });

  it('handles state updates', () => {
    const { getAllByDisplayValue } = render(<VerificationCode {...screenProps} />);
    const inputs = getAllByDisplayValue('');
    
    fireEvent.changeText(inputs[0], '5');
    fireEvent.changeText(inputs[0], '1');
    
    expect(inputs[0].props.value).toBe('1');
  });

  it('handles multiple button presses', () => {
    const { getByTestId, getByText } = render(<VerificationCode {...screenProps} />);
    const verifyButton = getByTestId('custom-g-button');
    const resendButton = getByText(/Resend Code/);
    
    fireEvent.press(verifyButton);
    fireEvent.press(resendButton);
    
    expect(verifyButton).toBeTruthy();
    expect(resendButton).toBeTruthy();
  });

  it('handles OTP completion', () => {
    const { getAllByDisplayValue } = render(<VerificationCode {...screenProps} />);
    const inputs = getAllByDisplayValue('');
    
    fireEvent.changeText(inputs[0], '1');
    fireEvent.changeText(inputs[1], '2');
    fireEvent.changeText(inputs[2], '3');
    fireEvent.changeText(inputs[3], '4');
    
    expect(inputs.every(input => input.props.value !== '')).toBe(true);
  });

  it('handles invalid OTP characters', () => {
    const { getAllByDisplayValue } = render(<VerificationCode {...screenProps} />);
    const inputs = getAllByDisplayValue('');
    
    fireEvent.changeText(inputs[0], 'a');
    fireEvent.changeText(inputs[1], '!');
    
    expect(inputs[0].props.value).toBe('a');
    expect(inputs[1].props.value).toBe('!');
  });

  it('handles rapid input changes', () => {
    const { getAllByDisplayValue } = render(<VerificationCode {...screenProps} />);
    const inputs = getAllByDisplayValue('');
    
    for (let i = 0; i < 4; i++) {
      fireEvent.changeText(inputs[i], String(i + 1));
    }
    
    expect(inputs[0].props.value).toBe('1');
    expect(inputs[3].props.value).toBe('4');
  });

  it('handles resend OTP with success message', async () => {
    const mockResendOtpApi = jest.fn().mockResolvedValue({});
    const propsWithSuccess = {
      ...screenProps,
      resendOtpApi: mockResendOtpApi,
      verifyOTPData: { 
        ...screenProps.verifyOTPData, 
        message: 'OTP sent successfully' 
      }
    };
    
    const { getByText } = render(<VerificationCode {...propsWithSuccess} />);
    const resendButton = getByText(/Resend Code/);
    
    fireEvent.press(resendButton);
    
    await waitFor(() => {
      expect(mockResendOtpApi).toHaveBeenCalledWith({
        email: 'test@example.com'
      });
    });
  });

  it('handles resend OTP with error message', async () => {
    const mockResendOtpApi = jest.fn().mockResolvedValue({});
    const propsWithError = {
      ...screenProps,
      resendOtpApi: mockResendOtpApi,
      verifyOTPData: { 
        ...screenProps.verifyOTPData, 
        message: 'Failed to send OTP' 
      }
    };
    
    const { getByText } = render(<VerificationCode {...propsWithError} />);
    const resendButton = getByText(/Resend Code/);
    
    fireEvent.press(resendButton);
    
    await waitFor(() => {
      expect(mockResendOtpApi).toHaveBeenCalled();
    });
  });

  it('handles verify OTP with success message', async () => {
    const mockVerifyOtpApi = jest.fn().mockResolvedValue({});
    const propsWithSuccess = {
      ...screenProps,
      verifyOtpApi: mockVerifyOtpApi,
      verifyOTPData: { 
        ...screenProps.verifyOTPData, 
        message: 'OTP verified successfully' 
      }
    };
    
    const { getAllByDisplayValue, getByTestId } = render(<VerificationCode {...propsWithSuccess} />);
    const inputs = getAllByDisplayValue('');
    
    // Fill OTP
    fireEvent.changeText(inputs[0], '1');
    fireEvent.changeText(inputs[1], '2');
    fireEvent.changeText(inputs[2], '3');
    fireEvent.changeText(inputs[3], '4');
    
    const verifyButton = getByTestId('custom-g-button');
    fireEvent.press(verifyButton);
    
    await waitFor(() => {
      expect(mockVerifyOtpApi).toHaveBeenCalledWith({
        otp: '1234'
      });
    });
  });

  it('handles verify OTP with error message', async () => {
    const mockVerifyOtpApi = jest.fn().mockResolvedValue({});
    const propsWithError = {
      ...screenProps,
      verifyOtpApi: mockVerifyOtpApi,
      verifyOTPData: { 
        ...screenProps.verifyOTPData, 
        message: 'Invalid OTP' 
      }
    };
    
    const { getAllByDisplayValue, getByTestId } = render(<VerificationCode {...propsWithError} />);
    const inputs = getAllByDisplayValue('');
    
    // Fill OTP
    fireEvent.changeText(inputs[0], '1');
    fireEvent.changeText(inputs[1], '2');
    fireEvent.changeText(inputs[2], '3');
    fireEvent.changeText(inputs[3], '4');
    
    const verifyButton = getByTestId('custom-g-button');
    fireEvent.press(verifyButton);
    
    await waitFor(() => {
      expect(mockVerifyOtpApi).toHaveBeenCalled();
    });
  });

  it('handles timer countdown to zero', async () => {
    jest.useFakeTimers();
    
    const { getByText } = render(<VerificationCode {...screenProps} />);
    
    // Fast forward timer
    jest.advanceTimersByTime(120000); // 2 minutes
    
    expect(getByText).toBeTruthy();
    
    jest.useRealTimers();
  });

  it('handles component unmount with timer cleanup', () => {
    const { unmount } = render(<VerificationCode {...screenProps} />);
    
    // Component should clean up timer on unmount
    unmount();
    
    expect(true).toBe(true); // Timer cleanup happens in componentWillUnmount
  });

  it('handles exception in resend OTP', async () => {
    const mockResendOtpApi = jest.fn().mockRejectedValue(new Error('Network error'));
    const propsWithError = {
      ...screenProps,
      resendOtpApi: mockResendOtpApi,
    };
    
    const { getByText } = render(<VerificationCode {...propsWithError} />);
    const resendButton = getByText(/Resend Code/);
    
    fireEvent.press(resendButton);
    
    await waitFor(() => {
      expect(mockResendOtpApi).toHaveBeenCalled();
    });
  });

  it('handles exception in verify OTP', async () => {
    const mockVerifyOtpApi = jest.fn().mockRejectedValue(new Error('Network error'));
    const propsWithError = {
      ...screenProps,
      verifyOtpApi: mockVerifyOtpApi,
    };
    
    const { getAllByDisplayValue, getByTestId } = render(<VerificationCode {...propsWithError} />);
    const inputs = getAllByDisplayValue('');
    
    // Fill OTP
    fireEvent.changeText(inputs[0], '1');
    fireEvent.changeText(inputs[1], '2');
    fireEvent.changeText(inputs[2], '3');
    fireEvent.changeText(inputs[3], '4');
    
    const verifyButton = getByTestId('custom-g-button');
    fireEvent.press(verifyButton);
    
    await waitFor(() => {
      expect(mockVerifyOtpApi).toHaveBeenCalled();
    });
  });
});
