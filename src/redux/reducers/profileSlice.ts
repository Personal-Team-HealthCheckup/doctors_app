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
  phoneNumber?: string;
}
export interface authDataType {
  message: string | null;
  loading: boolean;
  data: IUser | null;
}

const initialState: authDataType = {
  message: null,
  loading: false,
  data: null,
};

// profile action
export const getProfileAction = createAsyncThunk(
  'getProfileAction',
  async (_, { getState, rejectWithValue, fulfillWithValue }) => {
    console.log('getProfileAction called');
    const { response, error, errorResponse } = await networkCall(
      endpoints.PROFILE,
    );

    if (response) {
      return response;
    }
    return rejectWithValue({ message: error, ...errorResponse });
  },
);

export const AuthSlice = createSlice({
  name: 'authlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProfileAction.pending, state => {
        state.loading = true;
        state.message = null;
      })
      .addCase(getProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(getProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload
          ? (action.payload as any).message
          : action.error.message || null;
      });
  },
});

export default AuthSlice.reducer;
