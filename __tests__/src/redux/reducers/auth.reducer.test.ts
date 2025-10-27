import reducer, {
  actionLogout,
  loginAction,
  signupAction,
  forgotPasswordAction,
  resetPasswordAction,
  verifyOtpAction,
  resendOtpAction,
} from '../../../../src/redux/reducers/auth';

const initialState = reducer(undefined, { type: '@@INIT' } as any);

describe('auth reducer', () => {
  it('returns initial state', () => {
    expect(initialState.loading).toBe(false);
    expect(initialState.token).toBeNull();
  });

  it('handles login lifecycle', () => {
    let state = reducer(initialState, loginAction.pending('', { email: 'a', password: 'b' } as any));
    expect(state.loading).toBe(true);

    state = reducer(
      state,
      loginAction.fulfilled(
        {
          message: 'login success',
          token: 'token',
          user: { role: 'user' },
        } as any,
        '',
        { email: 'a', password: 'b' },
      ),
    );
    expect(state.loading).toBe(false);
    expect(state.token).toBe('token');

    state = reducer(
      state,
      loginAction.rejected({ message: 'not verified' } as any, '', { email: 'a', password: 'b' }, {
        message: 'not verified',
        token: 'temp',
        email: 'a',
      }),
    );
    expect(state.token).toBe('temp');
    expect(state.email).toBe('a');
  });

  it('handles signup, forgot password, reset password and otp flows', () => {
    let state = reducer(
      initialState,
      signupAction.fulfilled(
        {
          message: 'signup success',
          token: 'signup-token',
          email: 'user@example.com',
          role: 'user',
        } as any,
        '',
        { email: 'user@example.com', password: 'pass' },
      ),
    );
    expect(state.email).toBe('user@example.com');

    state = reducer(
      state,
      forgotPasswordAction.fulfilled(
        {
          message: 'forgot success',
          token: 'forgot-token',
          email: 'user@example.com',
          type: 'forgot-password',
        } as any,
        '',
        { email: 'user@example.com' },
      ),
    );
    expect(state.type).toBe('forgot-password');

    state = reducer(
      state,
      resetPasswordAction.fulfilled(
        {
          message: 'reset success',
          token: 'reset-token',
          type: 'reset-password',
        } as any,
        '',
        { email: 'user@example.com', otp: '1234', password: 'pass' },
      ),
    );
    expect(state.token).toBe('reset-token');
    expect(state.type).toBe('reset-password');

    state = reducer(
      state,
      verifyOtpAction.fulfilled(
        {
          message: 'verify success',
          token: 'verify-token',
          email: 'user@example.com',
          type: 'verify',
        } as any,
        '',
        { otp: '1234' },
      ),
    );
    expect(state.token).toBe('verify-token');
    expect(state.email).toBe('user@example.com');

    state = reducer(
      state,
      resendOtpAction.fulfilled(
        {
          message: 'resend success',
          token: 'resend-token',
        } as any,
        '',
        { email: 'user@example.com' },
      ),
    );
    expect(state.token).toBe('resend-token');
  });

  it('handles logout action', () => {
    const loggedInState = {
      ...initialState,
      token: 'token',
      user: { id: 1 },
      email: 'user@example.com',
      message: 'hello',
      userRole: 'admin',
    } as any;

    const state = reducer(loggedInState, actionLogout());
    expect(state.token).toBeNull();
    expect(state.user).toBeUndefined();
    expect(state.email).toBe('');
    expect(state.userRole).toBe('user');
    expect(state.message).toBeNull();
  });
});
