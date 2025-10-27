import reducer, {
  actionLogout,
  loginAction,
  signupAction,
  forgotPasswordAction,
  resetPasswordAction,
  verifyOtpAction,
  resendOtpAction,
} from '../../../../src/redux/reducers/auth';
import networkCall from '../../../../src/helper/networkCall';
import { storeAuthToken } from '../../../../src/helper/authKeychain';

jest.mock('../../../../src/helper/networkCall', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../../src/helper/authKeychain', () => ({
  storeAuthToken: jest.fn(),
}));

const initialState = reducer(undefined, { type: '@@INIT' } as any);
const networkCallMock = networkCall as jest.MockedFunction<typeof networkCall>;
const storeAuthTokenMock =
  storeAuthToken as jest.MockedFunction<typeof storeAuthToken>;

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

describe('auth thunks', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loginAction resolves and stores token', async () => {
    networkCallMock.mockResolvedValueOnce({
      response: {
        message: 'login success',
        token: 'token-123',
        user: { role: 'user' },
      },
    } as any);

    const result = await loginAction({
      email: 'user@example.com',
      password: 'secret',
    })(dispatch, getState, undefined);

    expect(storeAuthTokenMock).toHaveBeenCalledWith('token-123');
    expect(result.type).toBe('loginAction/fulfilled');
    expect(result.payload).toEqual({
      message: 'login success',
      token: 'token-123',
      user: { role: 'user' },
    });
  });

  it('loginAction rejects when api fails', async () => {
    networkCallMock.mockResolvedValueOnce({
      response: null,
      error: 'Bad credentials',
      errorResponse: { token: 'temp', email: 'user@example.com' },
    } as any);

    const result = await loginAction({
      email: 'user@example.com',
      password: 'secret',
    })(dispatch, getState, undefined);

    expect(storeAuthTokenMock).not.toHaveBeenCalled();
    expect(result.type).toBe('loginAction/rejected');
    expect(result.payload).toEqual({
      message: 'Bad credentials',
      token: 'temp',
      email: 'user@example.com',
    });
  });

  it('signupAction fulfils and persists token', async () => {
    networkCallMock.mockResolvedValueOnce({
      response: {
        message: 'signup success',
        token: 'signup-token',
        email: 'new@example.com',
        role: 'user',
      },
    } as any);

    const result = await signupAction({
      email: 'new@example.com',
      password: 'secret',
      fullName: 'User Example',
      acceptedTerms: true,
      role: 'user',
    })(dispatch, getState, undefined);

    expect(storeAuthTokenMock).toHaveBeenCalledWith('signup-token');
    expect(result.type).toBe('signupAction/fulfilled');
    expect(result.payload).toEqual({
      message: 'signup success',
      token: 'signup-token',
      email: 'new@example.com',
      role: 'user',
    });
  });

  it('signupAction handles rejection', async () => {
    networkCallMock.mockResolvedValueOnce({
      response: null,
      error: 'Email taken',
    } as any);

    const result = await signupAction({
      email: 'dup@example.com',
      password: 'secret',
      fullName: 'Dup User',
      acceptedTerms: true,
      role: 'user',
    })(dispatch, getState, undefined);

    expect(storeAuthTokenMock).not.toHaveBeenCalled();
    expect(result.type).toBe('signupAction/rejected');
    expect(result.payload).toEqual({ message: 'Email taken' });
  });

  it('forgotPasswordAction handles success and stores token', async () => {
    networkCallMock.mockResolvedValueOnce({
      response: {
        message: 'sent',
        token: 'reset-token',
        email: 'reset@example.com',
        type: 'forgot-password',
      },
    } as any);

    const result = await forgotPasswordAction({
      email: 'reset@example.com',
    })(dispatch, getState, undefined);

    expect(storeAuthTokenMock).toHaveBeenCalledWith('reset-token');
    expect(result.type).toBe('forgotPasswordAction/fulfilled');
    expect(result.payload).toEqual({
      message: 'sent',
      token: 'reset-token',
      email: 'reset@example.com',
      type: 'forgot-password',
    });
  });

  it('forgotPasswordAction rejects with message', async () => {
    networkCallMock.mockResolvedValueOnce({
      response: null,
      error: 'unregistered',
    } as any);

    const result = await forgotPasswordAction({
      email: 'unknown@example.com',
    })(dispatch, getState, undefined);

    expect(storeAuthTokenMock).not.toHaveBeenCalled();
    expect(result.type).toBe('forgotPasswordAction/rejected');
    expect(result.payload).toEqual({ message: 'unregistered' });
  });

  it('resetPasswordAction stores token when present', async () => {
    networkCallMock.mockResolvedValueOnce({
      response: {
        message: 'reset success',
        token: 'new-token',
        type: 'reset-password',
      },
    } as any);

    const result = await resetPasswordAction({
      email: 'reset@example.com',
      otp: '123456',
      password: 'newpass',
    })(dispatch, getState, undefined);

    expect(storeAuthTokenMock).toHaveBeenCalledWith('new-token');
    expect(result.type).toBe('resetPasswordAction/fulfilled');
    expect(result.payload).toEqual({
      message: 'reset success',
      token: 'new-token',
      type: 'reset-password',
    });
  });

  it('resetPasswordAction resolves without storing token when missing', async () => {
    networkCallMock.mockResolvedValueOnce({
      response: {
        message: 'reset success',
        type: 'reset-password',
      },
    } as any);

    const result = await resetPasswordAction({
      email: 'reset@example.com',
      otp: '123456',
      password: 'newpass',
    })(dispatch, getState, undefined);

    expect(storeAuthTokenMock).not.toHaveBeenCalled();
    expect(result.type).toBe('resetPasswordAction/fulfilled');
    expect(result.payload).toEqual({
      message: 'reset success',
      type: 'reset-password',
    });
  });

  it('resetPasswordAction rejects on error', async () => {
    networkCallMock.mockResolvedValueOnce({
      response: null,
      error: 'invalid otp',
    } as any);

    const result = await resetPasswordAction({
      email: 'reset@example.com',
      otp: '0000',
      password: 'newpass',
    })(dispatch, getState, undefined);

    expect(result.type).toBe('resetPasswordAction/rejected');
    expect(result.payload).toEqual({ message: 'invalid otp' });
  });

  it('verifyOtpAction handles success and failure', async () => {
    networkCallMock.mockResolvedValueOnce({
      response: {
        message: 'verified',
        token: 'verify-token',
        email: 'user@example.com',
        type: 'verify',
      },
    } as any);

    const fulfilled = await verifyOtpAction({ otp: '1234' })(
      dispatch,
      getState,
      undefined,
    );

    expect(storeAuthTokenMock).toHaveBeenCalledWith('verify-token');
    expect(fulfilled.type).toBe('verifyOtpAction/fulfilled');
    expect(fulfilled.payload).toEqual({
      message: 'verified',
      token: 'verify-token',
      email: 'user@example.com',
      type: 'verify',
    });

    networkCallMock.mockResolvedValueOnce({
      response: null,
      error: 'invalid',
    } as any);

    const rejected = await verifyOtpAction({ otp: '9999' })(
      dispatch,
      getState,
      undefined,
    );

    expect(rejected.type).toBe('verifyOtpAction/rejected');
    expect(rejected.payload).toEqual({ message: 'invalid' });
  });

  it('resendOtpAction handles lifecycle', async () => {
    networkCallMock.mockResolvedValueOnce({
      response: {
        message: 'resent',
        token: 'resend-token',
      },
    } as any);

    const result = await resendOtpAction({ email: 'user@example.com' })(
      dispatch,
      getState,
      undefined,
    );

    expect(storeAuthTokenMock).toHaveBeenCalledWith('resend-token');
    expect(result.type).toBe('resendOtpAction/fulfilled');
    expect(result.payload).toEqual({
      message: 'resent',
      token: 'resend-token',
    });

    networkCallMock.mockResolvedValueOnce({
      response: null,
      error: 'rate limited',
    } as any);

    const rejected = await resendOtpAction({ email: 'user@example.com' })(
      dispatch,
      getState,
      undefined,
    );

    expect(rejected.type).toBe('resendOtpAction/rejected');
    expect(rejected.payload).toEqual({ message: 'rate limited' });
  });
});
