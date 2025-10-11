/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../helper/config';
import networkCall from '../../helper/networkCall';

export interface authDataType {
  message: string | null;
  loading: boolean;
  token: string | null;
  userRole: string;
}

const initialState: authDataType = {
  message: null,
  loading: false,
  token: null,
  userRole: 'user',
};

export const loginAction = createAsyncThunk(
  'loginAction',
  async (
    { username, password }: { username: string; password: string },
    { getState, rejectWithValue, fulfillWithValue },
  ) => {
    const data = {
      username,
      password,
    };
    const { response, error } = await networkCall(
      endpoints.LOGIN,
      'POST',
      JSON.stringify(data),
    );
    if (response) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue('Something went wrong!');
    }
  },
);
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

    if (response) return fulfillWithValue(response);
    return rejectWithValue('Something went wrong!' + error);
  },
);

export const AuthSlice = createSlice({
  name: 'authlice',
  initialState,
  reducers: {
    actionLogout: state => {
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
      state.message = null;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.userRole = action.payload.role;
      state.message = null;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.message = 'Please try again!';
    });
    builder.addCase(signupAction.pending, (state, action) => {
      state.loading = true;
      state.message = null;
    });
    builder.addCase(signupAction.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.message = null;
    });
    builder.addCase(signupAction.rejected, (state, action) => {
      state.loading = false;
      state.message = 'Please try again!';
    });
  },
});

export const { actionLogout } = AuthSlice.actions;

export default AuthSlice.reducer;
