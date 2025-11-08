import { Alert } from 'react-native';
import { AUTH } from '../../../../src/Constants/Navigator';
import VerificationCodeConnected from '../../../../src/screen/auth/VerificationCode';
import { navigateTo } from '../../../../src/helper/utilities';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { View as MockView } from 'react-native';
jest.mock('../../../../src/helper/utilities', () => {
  const actual = jest.requireActual('../../../../src/helper/utilities');
  return {
    ...actual,
    navigateTo: jest.fn(),
  };
});

jest.mock('../../../../src/Components/OTPTextInput.tsx', () => (props: {}) => {
  return <MockView {...props} />;
});
const VerificationCode =
  (VerificationCodeConnected as any).WrappedComponent ||
  VerificationCodeConnected;
1;
const createProps = (overrides: Partial<any> = {}) => ({
  navigation: { navigate: jest.fn() },
  route: { params: { email: 'user@example.com' } },
  verifyOTPData: {
    email: 'user@example.com',
    message: 'otp success',
    loading: false,
  },
  verifyOtpApi: jest.fn().mockResolvedValue(undefined),
  resendOtpApi: jest.fn().mockResolvedValue(undefined),
  ...overrides,
});

const syncSetState = (instance: any) => {
  instance.setState = (update: any) => {
    const partial =
      typeof update === 'function'
        ? update(instance.state, instance.props)
        : update;
    if (partial) {
      instance.state = { ...instance.state, ...partial };
    }
  };
};
describe('VerificationCode screen', () => {
  const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  beforeEach(() => {
    jest.spyOn(globalThis, 'setInterval').mockImplementation((cb: Function) => {
      if (cb) {
        cb();
      }
      return 1 as ReturnType<typeof setInterval>;
    });
  });

  it('marks forgot password flow and counts down timer on mount', () => {
    const props = createProps({
      route: { params: { fromScreen: 'ForgotPassword' } },
    });
    const instance = new VerificationCode(props as any);
    syncSetState(instance);

    instance.componentDidMount();

    expect(instance.state.isForgotPasswordFlow).toBe(true);

    jest.advanceTimersByTime(3000);

    instance.componentWillUnmount();
  });

  it('handles resend OTP success and error paths', async () => {
    const props = createProps();
    const instance = new VerificationCode(props as any);
    syncSetState(instance);

    await instance.handleResendOtp();
    expect(props.resendOtpApi).toHaveBeenCalledWith({
      email: props.verifyOTPData.email,
    });
    expect(alertSpy).toHaveBeenCalledWith(
      'Successs',
      props.verifyOTPData.message,
    );

    props.verifyOTPData.message = 'failure';
    await instance.handleResendOtp();
    expect(alertSpy).toHaveBeenCalledWith('Error', 'failure');
  });

  it('verifies OTP and navigates to reset password using fallback email when in forgot flow', async () => {
    const props = createProps({
      verifyOTPData: {
        email: '',
        message: 'success',
        loading: false,
      },
      route: { params: { email: 'route@example.com' } },
    });
    const instance = new VerificationCode(props as any);
    syncSetState(instance);
    instance.setState({
      code: '1234',
      isForgotPasswordFlow: true,
    });

    await instance.handleVerification();

    expect(props.verifyOtpApi).toHaveBeenCalledWith({ otp: '1234' });
    expect(navigateTo).toHaveBeenCalledWith(
      props.navigation,
      AUTH.RESETPASSWORD,
      {
        email: 'route@example.com',
        otp: '1234',
      },
    );
    expect(alertSpy).toHaveBeenCalledWith(
      'Successs',
      props.verifyOTPData.message,
    );
  });

  it('navigates to sign in when verification succeeds for normal flow', async () => {
    const props = createProps();
    const instance = new VerificationCode(props as any);
    syncSetState(instance);
    instance.setState({ code: '9999' });

    await instance.handleVerification();

    expect(navigateTo).toHaveBeenCalledWith(
      props.navigation,
      AUTH.SIGNIN,
      undefined,
    );
  });

  it('shows error alert when verification fails', async () => {
    const props = createProps();
    props.verifyOTPData.message = 'failure';
    const instance = new VerificationCode(props as any);
    syncSetState(instance);
    instance.setState({ code: '0000' });

    await instance.handleVerification();

    expect(alertSpy).toHaveBeenCalledWith('Error', 'failure');
  });

  it('handles resend OTP exceptions gracefully', async () => {
    const props = createProps({
      resendOtpApi: jest.fn().mockRejectedValue(new Error('network')),
    });
    const instance = new VerificationCode(props as any);
    syncSetState(instance);

    await instance.handleResendOtp();

    expect(alertSpy).toHaveBeenCalledWith('Error', 'network');
  });

  it('alerts when verification API throws', async () => {
    const props = createProps({
      verifyOtpApi: jest.fn().mockRejectedValue(new Error('server down')),
    });
    const instance = new VerificationCode(props as any);
    syncSetState(instance);
    instance.setState({ code: '5555' });

    await instance.handleVerification();

    expect(alertSpy).toHaveBeenCalledWith('Error', 'server down');
  });

  it('updates code on OTP change and formats timer text', () => {
    const instance = new VerificationCode(createProps() as any);
    syncSetState(instance);
    instance.handleOTPChange('7777');
    expect(instance.state.code).toBe('7777');
    expect(instance.formatedTime(65)).toBe('(01:05)');
  });
  it('render verification code otp page ', () => {
    const props = {
      navigation: {},
      route: {
        params: {
          fromScreen: '',
          email: 'user@example.com',
        },
      },
    };
    const { getByTestId } = render(<VerificationCodeConnected {...props} />);

    const txtInputChangeOtp = getByTestId('otp-text-input');
    txtInputChangeOtp.props.onChangeOTP('1234');
    const btnVerify = getByTestId('btn-verify');
    fireEvent.press(btnVerify);
  });
});
