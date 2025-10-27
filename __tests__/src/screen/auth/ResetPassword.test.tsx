import { Alert } from 'react-native';
import { AUTH } from '../../../../src/Constants/Navigator';
import ResetPasswordConnected from '../../../../src/screen/auth/ResetPassword';
import { navigateTo, replaceTo } from '../../../../src/helper/utilities';

jest.mock('../../../../src/helper/utilities', () => {
  const actual = jest.requireActual('../../../../src/helper/utilities');
  return {
    ...actual,
    navigateTo: jest.fn(),
    replaceTo: jest.fn(),
  };
});

jest.mock('../../../../src/helper/i18', () => ({
  translate: (key: string) => key,
}));

const ResetPassword =
  (ResetPasswordConnected as any).WrappedComponent || ResetPasswordConnected;

const createProps = (overrides: Partial<any> = {}) => ({
  navigation: { navigate: jest.fn(), replace: jest.fn() },
  route: { params: { email: 'user@example.com', otp: '1234' } },
  authData: {
    loading: false,
    message: 'Password reset success',
    email: 'user@example.com',
  },
  resetPasswordApi: jest.fn().mockResolvedValue(undefined),
  ...overrides,
});

describe('ResetPassword screen logic', () => {
  const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    alertSpy.mockRestore();
  });

  it('validates form fields and sets errors', () => {
    const component = new ResetPassword(createProps() as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    component.setState({ password: '123', confirmPassword: '12' });
    expect(component.validateForm()).toBe(false);
    expect(component.state.error.password).toBe('auth.passwordMin');
    expect(component.state.error.confirmPassword).toBe('auth.passwordMismatch');
  });

  it('alerts when session data missing', () => {
    const props = createProps({ route: { params: { email: '', otp: '' } } });
    const component = new ResetPassword(props as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    component.componentDidMount();
    expect(alertSpy).toHaveBeenCalledWith(
      'Error',
      'auth.resetSessionMissing',
      expect.any(Array),
    );
  });

  it('handles successful password reset', async () => {
    const props = createProps();
    const component = new ResetPassword(props as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    component.setState({ password: '123456', confirmPassword: '123456' });

    await component.handleResetPress();

    expect(props.resetPasswordApi).toHaveBeenCalledWith({
      email: 'user@example.com',
      otp: '1234',
      password: '123456',
    });
  });

  it('alerts when email or otp missing', async () => {
    const props = createProps({ route: { params: { email: '', otp: '' } } });
    const component = new ResetPassword(props as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    component.setState({ password: '123456', confirmPassword: '123456' });

    await component.handleResetPress();

    expect(alertSpy).toHaveBeenCalledWith('Error', 'auth.resetSessionInvalid');
  });
});
