import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { AUTH } from '../../../../src/Constants/Navigator';
import ForgotPasswordConnected from '../../../../src/screen/auth/ForgotPassword';
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

const ForgotPassword =
  (ForgotPasswordConnected as any).WrappedComponent || ForgotPasswordConnected;

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

const createProps = () => ({
  navigation: { navigate: jest.fn() },
  forgotPassData: {
    loading: false,
    message: null,
    token: null,
    type: '',
    email: '',
  },
  forgotPasswordApi: jest.fn().mockResolvedValue(undefined),
});

describe('ForgotPassword screen logic', () => {
  const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    alertSpy.mockRestore();
  });

  it('validates email and sets error when empty', () => {
    const component = new ForgotPassword(createProps() as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    expect(component.validateEmail()).toBe(false);
    expect(component.state.error).toBe('auth.emailRequired');
  });

  it('handles reset flow and navigates when successful', async () => {
    const props = createProps();
    const component = new ForgotPassword(props as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    component.setState({ email: 'user@example.com' });

    props.forgotPassData.message = 'success';
    props.forgotPassData.token = 'token';
    props.forgotPassData.type = 'forgot-password';

    await component.handleResetPress();

    expect(props.forgotPasswordApi).toHaveBeenCalledWith({
      email: 'user@example.com',
    });
    expect(navigateTo).toHaveBeenCalledWith(
      props.navigation,
      AUTH.VERIFICATION,
      {
        email: 'user@example.com',
        fromScreen: 'ForgotPassword',
      },
    );
    expect(alertSpy).toHaveBeenCalledWith('Success', JSON.stringify('success'));
  });

  it('shows error alert when api throws', async () => {
    const props = createProps();
    props.forgotPasswordApi.mockRejectedValueOnce(new Error('fail'));
    const component = new ForgotPassword(props as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    component.setState({ email: 'user@example.com' });

    await component.handleResetPress();

    expect(alertSpy).toHaveBeenCalledWith('Error', 'fail');
  });

  it('renders form and shows validation message when email missing', async () => {
    const props = createProps();
    const { getByText } = render(<ForgotPassword {...props} />);

    fireEvent.press(getByText('auth.sendResetLink'));

    await waitFor(() => {
      expect(getByText('auth.emailRequired')).toBeTruthy();
    });
    expect(props.forgotPasswordApi).not.toHaveBeenCalled();
  });

  it('submits reset request and navigates on success', async () => {
    const props = createProps();
    props.forgotPassData = {
      loading: false,
      message: 'success reset',
      token: 'token',
      type: 'forgot-password',
      email: 'user@example.com',
    };

    const { getByPlaceholderText, getByText } = render(
      <ForgotPassword {...props} />,
    );

    fireEvent.changeText(
      getByPlaceholderText('auth.emailPlaceholder'),
      'user@example.com',
    );
    fireEvent.press(getByText('auth.sendResetLink'));

    await waitFor(() => {
      expect(props.forgotPasswordApi).toHaveBeenCalledWith({
        email: 'user@example.com',
      });
    });

    expect(navigateTo).toHaveBeenCalledWith(
      props.navigation,
      AUTH.VERIFICATION,
      {
        email: 'user@example.com',
        fromScreen: 'ForgotPassword',
      },
    );
  });

  it('navigates to login when link pressed', () => {
    const props = createProps();
    const { getByText } = render(<ForgotPassword {...props} />);

    fireEvent.press(getByText('auth.rememberPassword auth.login'));
    expect(navigateTo).toHaveBeenCalledWith(props.navigation, AUTH.SIGNIN);
  });
});
