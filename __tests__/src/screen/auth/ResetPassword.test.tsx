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

jest.mock('../../../../src/redux/store', () => {
  const mockStore = {
    dispatch: jest.fn(),
    getState: jest.fn(() => ({ Auth: {} })),
  };
  const mockPersistor = {
    subscribe: jest.fn(),
    getState: jest.fn(() => ({ bootstrapped: false })),
  };
  return {
    __esModule: true,
    default: mockStore,
    store: mockStore,
    persistor: mockPersistor,
  };
});

const createProps = (overrides: Partial<any> = {}) => {
  const base = {
    navigation: { navigate: jest.fn(), replace: jest.fn() },
    route: { params: { email: 'user@example.com', otp: '1234' } },
    authData: {
      loading: false,
      message: 'Password reset success',
      email: 'user@example.com',
    },
    resetPasswordApi: jest.fn().mockResolvedValue(undefined),
  };
  return { ...base, ...overrides };
};

const setStateSync = (component: any) => {
  component.setState = (update: any) => {
    const value =
      typeof update === 'function'
        ? update(component.state, component.props)
        : update;
    component.state = { ...component.state, ...value };
  };
};

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
    setStateSync(component);
    component.setState({ password: '123', confirmPassword: '12' });
    expect(component.validateForm()).toBe(false);
    expect(component.state.error.password).toBe('auth.passwordMin');
    expect(component.state.error.confirmPassword).toBe('auth.passwordMismatch');
  });

  it('alerts when session data missing', () => {
    const props = createProps({
      route: { params: { email: '', otp: '' } },
      authData: { loading: false, message: '', email: '' },
    });
    const component = new ResetPassword(props as any);
    setStateSync(component);
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
    setStateSync(component);
    component.setState({ password: '123456', confirmPassword: '123456' });

    await component.handleResetPress();

    expect(props.resetPasswordApi).toHaveBeenCalledWith({
      email: 'user@example.com',
      otp: '1234',
      password: '123456',
    });

    expect(alertSpy).toHaveBeenCalledWith(
      'Success',
      'Password reset success',
      expect.any(Array),
    );
  });

  it('alerts when email or otp missing', async () => {
    const props = createProps({
      route: { params: { email: '', otp: '' } },
      authData: { loading: false, message: '', email: '' },
    });
    const component = new ResetPassword(props as any);
    setStateSync(component);
    component.setState({ password: '123456', confirmPassword: '123456' });

    await component.handleResetPress();

    expect(alertSpy).toHaveBeenCalledWith('Error', 'auth.resetSessionInvalid');
  });

  it('alerts when api response is not success', async () => {
    const props = createProps();
    props.authData.message = 'unexpected';
    const component = new ResetPassword(props as any);
    setStateSync(component);
    component.setState({ password: '123456', confirmPassword: '123456' });

    await component.handleResetPress();

    expect(alertSpy).toHaveBeenCalledWith('Error', 'unexpected');
  });

  it('alerts when api throws error', async () => {
    const props = createProps();
    props.resetPasswordApi.mockRejectedValueOnce(new Error('server down'));
    const component = new ResetPassword(props as any);
    setStateSync(component);
    component.setState({ password: '654321', confirmPassword: '654321' });

    await component.handleResetPress();

    expect(alertSpy).toHaveBeenCalledWith('Error', 'server down');
  });

  it('navigates back to login explicitly', () => {
    const props = createProps();
    const component = new ResetPassword(props as any);
    component.handleNavigateToLogin();
    expect(replaceTo).toHaveBeenCalledWith(props.navigation, AUTH.SIGNIN);
  });

  it('clears individual field errors when changing inputs', () => {
    const component = new ResetPassword(createProps() as any);
    setStateSync(component);
    component.setState({
      password: '',
      confirmPassword: '',
      error: { password: 'err', confirmPassword: 'err' },
    });

    component.handlePasswordChange('newPass');
    expect(component.state.error.password).toBeUndefined();

    component.handleConfirmPasswordChange('newPass');
    expect(component.state.error.confirmPassword).toBeUndefined();
  });
});
