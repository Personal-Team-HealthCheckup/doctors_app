/* eslint-disable @typescript-eslint/no-unused-vars */

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {endpoints} from '../../helper/config';
import networkCall from '../../utils/networkCall';

export interface authDataType {
  message: string | null;
  loading: boolean;
  token: string | null;
  userRole: number;
}

const initialState: authDataType = {
  message: null,
  loading: false,
  token: null,
  userRole: 1,
};

export const loginAction = createAsyncThunk(
  'loginAction',
  async (
    {username, password}: {username: string; password: string},
    {getState, rejectWithValue, fulfillWithValue},
  ) => {
    const data = {
      username,
      password,
    };
    const {response, error} = await networkCall(
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
      state.message = null;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.message = 'Please try again!';
    });
  },
});

export const {actionLogout} = AuthSlice.actions;

export default AuthSlice.reducer;
