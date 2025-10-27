import React from 'react';
import { Alert, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { AUTH, MAINSTACK } from '../../../../src/Constants/Navigator';
import SigninConnected from '../../../../src/screen/auth/Signin';
import { navigateTo, replaceTo } from '../../../../src/helper/utilities';
import { mockNavigation } from '../../../../__mocks__/mock';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import store from '../../../../src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
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

const Signin = (SigninConnected as any).WrappedComponent || SigninConnected;

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
  navigation: { navigate: jest.fn(), replace: jest.fn() },
  loginData: {
    loading: false,
    message: 'login success',
    token: 'token',
    userRole: 'user',
  },
  loginApi: jest.fn().mockResolvedValue(undefined),
});

describe('Signin screen logic', () => {
  const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    alertSpy.mockRestore();
  });

  it('validates user input and sets errors', () => {
    const component = new Signin(createProps() as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    component.setState({ email: '', password: '' });
    const result = component.handleValidation();
    expect(result).toBe(false);
    expect(component.state.error.email).toBe('auth.emailInvalid');
    expect(component.state.error.password).toBe('auth.passwordMin');
  });

  it('handles successful login flow', async () => {
    const props = createProps();
    const component = new Signin(props as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    component.setState({ email: 'user@example.com', password: '123456' });

    await component.handleLogin();

    expect(props.loginApi).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: '123456',
    });
    expect(replaceTo).toHaveBeenCalledWith(
      props.navigation,
      MAINSTACK.HOMENAVIGATION,
    );
    expect(alertSpy).toHaveBeenCalledWith('Successs', 'login success');
  });

  it('navigates to verification when user not verified', async () => {
    const props = createProps();
    props.loginData.message = 'user not verified';
    props.loginData.userRole = 'user';
    props.loginData.token = null;

    const component = new Signin(props as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    component.setState({ email: 'user@example.com', password: '123456' });

    await component.handleLogin();

    expect(navigateTo).toHaveBeenCalledWith(
      props.navigation,
      AUTH.VERIFICATION,
      {
        email: 'user@example.com',
      },
    );
  });

  it('handles login failures gracefully', async () => {
    const props = createProps();
    props.loginApi.mockRejectedValueOnce(new Error('failure'));
    const component = new Signin(props as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    component.setState({ email: 'user@example.com', password: '123456' });

    await component.handleLogin();

    expect(alertSpy).toHaveBeenCalledWith('Error', 'failure');
  });

  it('handles non-success responses without verification', async () => {
    const props = createProps();
    props.loginData.message = 'invalid credentials';
    const component = new Signin(props as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };
    component.setState({ email: 'user@example.com', password: '123456' });

    await component.handleLogin();

    expect(alertSpy).toHaveBeenCalledWith('Error', 'invalid credentials');
    expect(replaceTo).not.toHaveBeenCalled();
  });

  it('does not submit when validation fails', async () => {
    const props = createProps();
    const component = new Signin(props as any);
    component.setState = updater => {
      const value =
        typeof updater === 'function'
          ? updater(component.state, component.props)
          : updater;
      component.state = { ...component.state, ...value };
    };

    component.setState({ email: '', password: '' });
    await component.handleLogin();
    expect(props.loginApi).not.toHaveBeenCalled();
    await component.navigateToForgotPassword();
    await component.navigateToSignup();
  });
});
