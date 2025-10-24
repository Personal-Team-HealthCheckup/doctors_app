/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../helper/config';
import networkCall from '../../helper/networkCall';
import { storeAuthToken } from '../../helper/authKeychain';

interface IUser {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  acceptedTerms: boolean;
}
export interface authDataType {
  message: string | null;
  loading: boolean;
  token: string | null;
  userRole: string;
  email: string;
  user?: IUser;
  type: string;
}

const initialState: authDataType = {
  message: null,
  loading: false,
  token: null, // Auth token null when not logged in getStoredAuthToken
  userRole: 'user',
  email: '',
  type: '',
};

// Login action
export const loginAction = createAsyncThunk(
  'loginAction',
  async (
    { email, password }: { email: string; password: string },
    { getState, rejectWithValue, fulfillWithValue },
  ) => {
    const data = {
      email,
      password,
    };
    const { response, error, errorResponse } = await networkCall(
      endpoints.LOGIN,
      'POST',
      JSON.stringify(data),
    );
    if (response) {
      await storeAuthToken(response.token);
      return fulfillWithValue(response);
    }
    return rejectWithValue({ message: error, ...errorResponse });
  },
);

// Signup action
export const signupAction = createAsyncThunk(
  'signupAction',
  async (
    {
      email,
      password,
      fullName,
      role = 'user',
      acceptedTerms,
    }: {
      email: string;
      password: string;
      fullName: string;
      role: 'user';
      acceptedTerms: boolean;
    },
    { getState, rejectWithValue, fulfillWithValue },
  ) => {
    const data = {
      email,
      password,
      fullName,
      role,
      acceptedTerms,
    };

    const { response, error } = await networkCall(
      endpoints.REGISTER,
      'POST',
      JSON.stringify(data),
    );

    if (response) {
      await storeAuthToken(response.token);
      return fulfillWithValue(response);
    }
    return rejectWithValue({ message: error });
  },
);
// forgot password action
export const forgotPasswordAction = createAsyncThunk(
  'forgotPasswordAction',
  async (
    {
      email,
    }: {
      email: string;
    },
    { getState, rejectWithValue, fulfillWithValue },
  ) => {
    const data = {
      email,
    };

    const { response, error } = await networkCall(
      endpoints.FORGOT_PASSWORD,
      'POST',
      JSON.stringify(data),
    );

    if (response) {
      await storeAuthToken(response.token);
      return fulfillWithValue(response);
    }
    return rejectWithValue({ message: error });
  },
);

export const resetPasswordAction = createAsyncThunk(
  'resetPasswordAction',
  async (
    {
      email,
      otp,
      password,
    }: {
      email: string;
      otp: string;
      password: string;
    },
    { getState, rejectWithValue, fulfillWithValue },
  ) => {
    const data = {
      email,
      otp,
      password,
    };

    const { response, error } = await networkCall(
      endpoints.RESET_PASSWORD,
      'POST',
      JSON.stringify(data),
    );

    if (response) {
      if (response.token) {
        await storeAuthToken(response.token);
      }
      return fulfillWithValue(response);
    }
    return rejectWithValue({ message: error });
  },
);
// Verify OTP action
export const verifyOtpAction = createAsyncThunk(
  'verifyOtpAction',
  async (
    {
      otp,
    }: {
      otp: string;
    },
    { getState, rejectWithValue, fulfillWithValue },
  ) => {
    const data = {
      otp,
    };

    const { response, error } = await networkCall(
      endpoints.VERIFYOTP,
      'POST',
      JSON.stringify(data),
    );

    if (response) {
      await storeAuthToken(response.token);
      return fulfillWithValue(response);
    }

    return rejectWithValue({ message: error });
  },
);

// Resend OTP action
export const resendOtpAction = createAsyncThunk(
  'resendOtpAction',
  async (
    {
      email,
    }: {
      email: string;
    },
    { getState, rejectWithValue, fulfillWithValue },
  ) => {
    const data = {
      email,
    };

    const { response, error } = await networkCall(
      endpoints.RESEND_OTP,
      'POST',
      JSON.stringify(data),
    );

    if (response) {
      await storeAuthToken(response.token);
      return fulfillWithValue(response);
    }

    return rejectWithValue({ message: error });
  },
);

export const AuthSlice = createSlice({
  name: 'authlice',
  initialState,
  reducers: {
    actionLogout: state => {
      state.token = null;
      state.user = undefined;
      state.email = '';
      state.userRole = 'user';
      state.message = null;
    },
  },
  extraReducers: builder => {
    // login
    builder
      .addCase(loginAction.pending, state => {
        state.loading = true;
        state.message = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        const { message, token, user } = action.payload;
        state.loading = false;
        state.token = token;
        state.userRole = user.role;
        state.user = user;
        state.message = message;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        state.message = payload?.message || 'Please try again!';
        if (payload?.message?.includes('not verified')) {
          state.token = payload.token;
          state.email = payload.email;
        }
      });

    // signup
    builder
      .addCase(signupAction.pending, state => {
        state.loading = true;
        state.message = null;
      })
      .addCase(signupAction.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.userRole = action.payload.role;
        state.message = action.payload.message;
      })
      .addCase(signupAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload
          ? (action.payload as any).message
          : 'Please try again!';
      });

    // forgot password
    builder
      .addCase(forgotPasswordAction.pending, state => {
        state.loading = true;
        state.message = null;
      })
      .addCase(forgotPasswordAction.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.message = action.payload.message;
        state.type = action.payload.type;
      })
      .addCase(forgotPasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload
          ? (action.payload as any).message
          : 'Please try again!';
      });

    // reset password
    builder
      .addCase(resetPasswordAction.pending, state => {
        state.loading = true;
        state.message = null;
      })
      .addCase(resetPasswordAction.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.token = action.payload.token ?? state.token;
        state.type = action.payload.type ?? state.type;
      })
      .addCase(resetPasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload
          ? (action.payload as any).message
          : 'Please try again!';
      });

    // verify otp
    builder
      .addCase(verifyOtpAction.pending, state => {
        state.loading = true;
        state.message = null;
      })
      .addCase(verifyOtpAction.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token ?? state.token;
        state.message = action.payload.message;
        state.email = action.payload.email ?? state.email;
        state.type = action.payload.type ?? state.type;
      })
      .addCase(verifyOtpAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload
          ? (action.payload as any).message
          : 'Please try again!';
      });

    // Resend otp
    builder
      .addCase(resendOtpAction.pending, state => {
        state.loading = true;
        state.message = null;
      })
      .addCase(resendOtpAction.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.message = action.payload.message;
      })
      .addCase(resendOtpAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload
          ? (action.payload as any).message
          : 'Please try again!';
      });
  },
});

export const { actionLogout } = AuthSlice.actions;

export default AuthSlice.reducer;
