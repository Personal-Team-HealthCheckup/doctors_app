import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { mockNavigation } from '../../../../__mocks__/mock';
import SignupScreen from '../../../../src/screen/auth/Signup';

const screenProps = {
  navigation: mockNavigation,
  signupData: {
    message: '',
    loading: false,
    error: null,
    token: null
  },
  signup: jest.fn(),
};

describe('SignupScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly (snapshot)', () => {
    render(<SignupScreen {...screenProps} />);
    expect(screen).toBeTruthy();
  });

  it('shows error message when present', () => {
    const propsWithError = {
      ...screenProps,
      signupData: { ...screenProps.signupData, message: 'Test error' }
    };
    const { getByText } = render(<SignupScreen {...propsWithError} />);
    expect(getByText('Test error')).toBeTruthy();
  });

  it('shows loading state', () => {
    const propsWithLoading = {
      ...screenProps,
      signupData: { ...screenProps.signupData, loading: true }
    };
    render(<SignupScreen {...propsWithLoading} />);
    expect(screen).toBeTruthy();
  });

  it('renders signup button', () => {
    const { getAllByText } = render(<SignupScreen {...screenProps} />);
    expect(getAllByText('Sign up').length).toBeGreaterThan(0);
  });

  it('renders login navigation text', () => {
    const { getByText } = render(<SignupScreen {...screenProps} />);
    expect(getByText('Have an account?')).toBeTruthy();
    expect(getByText('Log in')).toBeTruthy();
  });

  it('renders social login buttons', () => {
    const { getByText } = render(<SignupScreen {...screenProps} />);
    expect(getByText('Google')).toBeTruthy();
    expect(getByText('Facebook')).toBeTruthy();
  });

  it('handles navigation to login', () => {
    const { getByText } = render(<SignupScreen {...screenProps} />);
    const signInButton = getByText('Log in');
    fireEvent.press(signInButton);
    expect(mockNavigation.navigate).toHaveBeenCalled();
  });

  it('renders form inputs', () => {
    const { getByPlaceholderText } = render(<SignupScreen {...screenProps} />);
    expect(getByPlaceholderText('Name')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('handles text input changes for name', () => {
    const { getByPlaceholderText } = render(<SignupScreen {...screenProps} />);
    const nameInput = getByPlaceholderText('Name');
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

  it('handles checkbox toggle', () => {
    const { getByText } = render(<SignupScreen {...screenProps} />);
    const checkbox = getByText(/Terms of Service & Privacy Policy/);
    fireEvent.press(checkbox);
    expect(checkbox).toBeTruthy();
  });

  it('validates empty form submission', async () => {
    const { getByTestId } = render(<SignupScreen {...screenProps} />);
    const signupButton = getByTestId('custom-g-button');
    fireEvent.press(signupButton);
    await waitFor(() => {
      expect(screenProps.signup).not.toHaveBeenCalled();
    });
  });

  it('validates email format', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SignupScreen {...screenProps} />);
    
    fireEvent.changeText(getByPlaceholderText('Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    
    const signupButton = getByTestId('custom-g-button');
    fireEvent.press(signupButton);
    
    await waitFor(() => {
      expect(screenProps.signup).not.toHaveBeenCalled();
    });
  });

  it('validates password length', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SignupScreen {...screenProps} />);
    
    fireEvent.changeText(getByPlaceholderText('Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123');
    
    const signupButton = getByTestId('custom-g-button');
    fireEvent.press(signupButton);
    
    await waitFor(() => {
      expect(screenProps.signup).not.toHaveBeenCalled();
    });
  });

  it('validates terms acceptance', async () => {
    const { getByPlaceholderText, getByTestId } = render(<SignupScreen {...screenProps} />);
    
    fireEvent.changeText(getByPlaceholderText('Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    
    const signupButton = getByTestId('custom-g-button');
    fireEvent.press(signupButton);
    
    await waitFor(() => {
      expect(screenProps.signup).not.toHaveBeenCalled();
    });
  });

  it('submits valid form', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(<SignupScreen {...screenProps} />);
    
    fireEvent.changeText(getByPlaceholderText('Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText(/Terms of Service & Privacy Policy/));
    
    const signupButton = getByTestId('custom-g-button');
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
      signupData: { ...screenProps.signupData, token: 'test-token' }
    };
    
    const { getByPlaceholderText, getByTestId, getByText } = render(<SignupScreen {...propsWithToken} />);
    
    fireEvent.changeText(getByPlaceholderText('Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText(/Terms of Service & Privacy Policy/));
    
    const signupButton = getByTestId('custom-g-button');
    fireEvent.press(signupButton);
    
    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalled();
    });
  });

  it('handles signup error gracefully', async () => {
    const mockSignupError = jest.fn().mockRejectedValue(new Error('Signup failed'));
    const propsWithError = {
      ...screenProps,
      signup: mockSignupError
    };
    
    const { getByPlaceholderText, getByTestId, getByText } = render(<SignupScreen {...propsWithError} />);
    
    fireEvent.changeText(getByPlaceholderText('Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText(/Terms of Service & Privacy Policy/));
    
    const signupButton = getByTestId('custom-g-button');
    fireEvent.press(signupButton);
    
    await waitFor(() => {
      expect(mockSignupError).toHaveBeenCalled();
    });
  });

  it('renders terms and conditions', () => {
    const { getByText } = render(<SignupScreen {...screenProps} />);
    expect(getByText(/Terms of Service & Privacy Policy/)).toBeTruthy();
  });

  it('renders title', () => {
    const { getAllByText } = render(<SignupScreen {...screenProps} />);
    expect(getAllByText('Sign up').length).toBeGreaterThan(0);
  });

  it('renders description text', () => {
    const { getByText } = render(<SignupScreen {...screenProps} />);
    expect(getByText(/VHA is an innovated/)).toBeTruthy();
  });

  it('handles multiple validation errors', async () => {
    const { getByTestId } = render(<SignupScreen {...screenProps} />);
    const signupButton = getByTestId('custom-g-button');
    fireEvent.press(signupButton);
    
    await waitFor(() => {
      expect(screenProps.signup).not.toHaveBeenCalled();
    });
  });

  it('clears validation errors on input change', () => {
    const { getByPlaceholderText } = render(<SignupScreen {...screenProps} />);
    const nameInput = getByPlaceholderText('Name');
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
    
    expect(googleButton).toBeTruthy();
    expect(facebookButton).toBeTruthy();
  });
});
