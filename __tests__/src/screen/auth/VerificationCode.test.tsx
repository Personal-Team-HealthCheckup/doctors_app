import { Alert } from 'react-native';
import { AUTH } from '../../../../src/Constants/Navigator';
import VerificationCodeConnected from '../../../../src/screen/auth/VerificationCode';
import { navigateTo } from '../../../../src/helper/utilities';

jest.mock('../../../../src/helper/utilities', () => {
  const actual = jest.requireActual('../../../../src/helper/utilities');
  return {
    ...actual,
    navigateTo: jest.fn(),
  };
});

jest.mock('../../../../src/helper/i18', () => ({
  translate: (key: string) => key,
}));

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

describe('VerificationCode screen logic', () => {
  const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    alertSpy.mockRestore();
  });

  it('flags forgot password flow in componentDidMount', () => {
    const props = createProps({
      route: { params: { fromScreen: 'ForgotPassword' } },
    });
    const component = new VerificationCode(props as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    component.componentDidMount();
    expect(component.state.isForgotPasswordFlow).toBe(true);
    component.componentWillUnmount();
  });

  it('handles resend OTP and alerts success', async () => {
    const props = createProps();
    const component = new VerificationCode(props as any);
    await component.handleResendOtp();
    expect(props.resendOtpApi).toHaveBeenCalledWith({
      email: 'user@example.com',
    });
    expect(alertSpy).toHaveBeenCalledWith('Successs', 'otp success');
  });

  it('navigates to reset password when forgot flow', async () => {
    const props = createProps({
      route: {
        params: { fromScreen: 'ForgotPassword', email: 'user@example.com' },
      },
    });
    props.verifyOTPData.message = 'success';
    const component = new VerificationCode(props as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    component.setState({ code: '1234', isForgotPasswordFlow: true });

    await component.handleVerification();

    expect(navigateTo).toHaveBeenCalledWith(
      props.navigation,
      AUTH.RESETPASSWORD,
      {
        email: 'user@example.com',
        otp: '1234',
      },
    );
  });

  it('navigates to signin when verification succeeds for login flow', async () => {
    const props = createProps();
    props.verifyOTPData.message = 'success';
    const component = new VerificationCode(props as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    component.setState({ code: '9999' });

    await component.handleVerification();

    expect(navigateTo).toHaveBeenCalledWith(
      props.navigation,
      AUTH.SIGNIN,
      undefined,
    );
  });

  it('stops timer on unmount', () => {
    jest.useFakeTimers();
    const component = new VerificationCode(createProps() as any);
    const clearSpy = jest.spyOn(global, 'clearInterval');
    component.componentDidMount();
    jest.advanceTimersByTime(2000);
    component.componentWillUnmount();
    expect(clearSpy).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('formats time in mm:ss format', () => {
    const component = new VerificationCode(createProps() as any);
    expect(component.formatedTime(125)).toBe('(02:05)');
  });

  it('alerts error when resend message not success', async () => {
    const props = createProps();
    props.verifyOTPData.message = 'failed';
    const component = new VerificationCode(props as any);

    await component.handleResendOtp();

    expect(alertSpy).toHaveBeenCalledWith('Error', 'failed');
  });

  it('alerts error when verification message missing success', async () => {
    const props = createProps();
    props.verifyOTPData.message = 'bad otp';
    const component = new VerificationCode(props as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    component.setState({ code: '0000' });

    await component.handleVerification();

    expect(alertSpy).toHaveBeenCalledWith('Error', 'bad otp');
  });

  it('alerts when verification api throws error', async () => {
    const props = createProps();
    props.verifyOtpApi.mockRejectedValueOnce(new Error('server error'));
    const component = new VerificationCode(props as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    component.setState({ code: '1111' });

    await component.handleVerification();

    expect(alertSpy).toHaveBeenCalledWith('Error', 'server error');
  });
});
