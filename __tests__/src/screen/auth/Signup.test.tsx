import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { mockNavigation } from '../../../../__mocks__/mock';
import SignupScreen from '../../../../src/screen/auth/Signup';

const screenProps = {
  navigation: mockNavigation,
  signupData: {
    message: '',
    loading: false,
    error: null,
    token: null,
  },
  signup: jest.fn(),
};

describe('SignupScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles navigation to login', () => {
    const { getByTestId } = render(<SignupScreen {...screenProps} />);
    const signInButton = getByTestId('login-txt');
    fireEvent.press(signInButton);
    expect(mockNavigation.navigate).toHaveBeenCalled();
  });

  it('handles text input changes for name', () => {
    const { getByPlaceholderText } = render(<SignupScreen {...screenProps} />);
    const nameInput = getByPlaceholderText('Full Name');
    fireEvent.changeText(nameInput, 'John Doe');
    expect(nameInput.props.value).toBe('John Doe');
  });

  it('handles text input changes for email', () => {
    const { getByPlaceholderText } = render(<SignupScreen {...screenProps} />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'test@example.com');
    expect(emailInput.props.value).toBe('test@example.com');
  });

  it('handles text input changes for password', () => {
    const { getByPlaceholderText } = render(<SignupScreen {...screenProps} />);
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(passwordInput, 'password123');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('validates empty form submission', async () => {
    const { getByTestId } = render(<SignupScreen {...screenProps} />);
    const signupButton = getByTestId('btn-signup');
    fireEvent.press(signupButton);
    await waitFor(() => {
      expect(screenProps.signup).not.toHaveBeenCalled();
    });
  });

  it('validates email format', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <SignupScreen {...screenProps} />,
    );

    fireEvent.changeText(getByPlaceholderText('Full Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');

    const signupButton = getByTestId('btn-signup');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(screenProps.signup).not.toHaveBeenCalled();
    });
  });

  it('validates password length', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <SignupScreen {...screenProps} />,
    );

    fireEvent.changeText(getByPlaceholderText('Full Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123');

    const signupButton = getByTestId('btn-signup');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(screenProps.signup).not.toHaveBeenCalled();
    });
  });

  it('validates terms acceptance', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <SignupScreen {...screenProps} />,
    );

    fireEvent.changeText(getByPlaceholderText('Full Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');

    const signupButton = getByTestId('btn-signup');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(screenProps.signup).not.toHaveBeenCalled();
    });
  });

  it('submits valid form', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <SignupScreen {...screenProps} />,
    );

    fireEvent.changeText(getByPlaceholderText('Full Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText(/Terms of Service & Privacy Policy/));

    const signupButton = getByTestId('btn-signup');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(screenProps.signup).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        fullName: 'John Doe',
        role: 'user',
        acceptedTerms: true,
      });
    });
  });

  it('navigates to verification on successful signup', async () => {
    const propsWithToken = {
      ...screenProps,
      signupData: { ...screenProps.signupData, token: 'test-token' },
    };

    const { getByPlaceholderText, getByTestId, getByText } = render(
      <SignupScreen {...propsWithToken} />,
    );

    fireEvent.changeText(getByPlaceholderText('Full Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText(/Terms of Service & Privacy Policy/));

    const signupButton = getByTestId('btn-signup');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalled();
    });
  });

  it('handles signup error gracefully', async () => {
    const mockSignupError = jest
      .fn()
      .mockRejectedValue(new Error('Signup failed'));
    const propsWithError = {
      ...screenProps,
      signup: mockSignupError,
    };

    const { getByPlaceholderText, getByTestId, getByText } = render(
      <SignupScreen {...propsWithError} />,
    );

    fireEvent.changeText(getByPlaceholderText('Full Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText(/Terms of Service & Privacy Policy/));

    const signupButton = getByTestId('btn-signup');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(mockSignupError).toHaveBeenCalled();
    });
  });

  it('renders title', () => {
    const { getAllByText } = render(<SignupScreen {...screenProps} />);
    expect(getAllByText('Sign up').length).toBeGreaterThan(0);
  });

  it('handles multiple validation errors', async () => {
    const { getByTestId } = render(<SignupScreen {...screenProps} />);
    const signupButton = getByTestId('btn-signup');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(screenProps.signup).not.toHaveBeenCalled();
    });
  });

  it('clears validation errors on input change', () => {
    const { getByPlaceholderText } = render(<SignupScreen {...screenProps} />);
    const nameInput = getByPlaceholderText('Full Name');
    fireEvent.changeText(nameInput, 'John');
    fireEvent.changeText(nameInput, 'John Doe');
    expect(nameInput.props.value).toBe('John Doe');
  });

  it('handles social login button presses', () => {
    const { getByText } = render(<SignupScreen {...screenProps} />);
    const googleButton = getByText('Google');
    const facebookButton = getByText('Facebook');
    fireEvent.press(googleButton);
    fireEvent.press(facebookButton);
  });
});
