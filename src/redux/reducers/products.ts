import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {endpoints} from '../../helper/config';
import networkCall from '../../helper/networkCall';

export interface ProductsReducer {
  products: {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
  }[];
  loading: boolean;
}

const initialState: ProductsReducer = {
  products: [],
  loading: false,
};

export const getProducts = createAsyncThunk('getProducts', async () =>
  // _,
  // {getState, rejectWithValue, fulfillWithValue},
  {
    const {response, error} = await networkCall(endpoints.GET_PRODUCTS, 'GET');
    return response;
    // if (response) {
    //   return fulfillWithValue(response.data);
    // } else {
    //   return rejectWithValue('Something went wrong!');
    // }
  },
);

export const ProductSlice = createSlice({
  name: 'authlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default ProductSlice.reducer;
