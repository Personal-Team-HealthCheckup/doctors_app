/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '../../helper/config';
import networkCall from '../../helper/networkCall';

interface IUser {
  _id?: string;
  id?: string;
  fullName: string;
  email: string;
  role: string;
  acceptedTerms: boolean;
  phoneNumber?: string;
  userName?: string;
}
export interface AuthDataType {
  message: string | null;
  loading: boolean;
  data: IUser | null;
}

const initialState: AuthDataType = {
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

export const updateProfileAction = createAsyncThunk(
  'updateProfileAction',
  async (
    payload: Partial<Omit<IUser, '_id'>>,
    { rejectWithValue, fulfillWithValue },
  ) => {
    const { response, error, errorResponse } = await networkCall(
      endpoints.PROFILE,
      'PUT',
      JSON.stringify(payload),
    );

    if (response) {
      return fulfillWithValue(response);
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
      })
      .addCase(updateProfileAction.pending, state => {
        state.loading = true;
        state.message = null;
      })
      .addCase(updateProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(updateProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload
          ? (action.payload as any).message
          : action.error.message || null;
      });
  },
});

export default AuthSlice.reducer;
