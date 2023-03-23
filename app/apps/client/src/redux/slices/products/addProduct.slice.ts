import { urlAPI } from '../../../api/api.constants';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { product } from '../../types/product.types';

type addProduct = {
   object: {
      name: string;
      date: string;
      time: string;
      description: string;
      free: 'Бесплатное' | 'Платное';
      price: string;
      tickets: number;
   };
   token: string;
};

export const addProduct = createAsyncThunk('addProduct', async (args: addProduct) => {
   const { data } = await axios.post(
      `/api/products/add`,
      { ...args.object },
      { headers: { Authorization: 'Bearer ' + args.token } },
   );
   return data;
});

interface IAddProduct {
   id: string | null;
   addProductStatus: 'loading' | 'success' | 'error';
}

const initialState: IAddProduct = {
   id: null,
   addProductStatus: 'loading', // loading | success | error
};

export const addProductSlice = createSlice({
   name: 'addProduct',
   initialState,
   reducers: {
      updateAddStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.addProductStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(addProduct.pending, (state) => {
         state.addProductStatus = 'loading';
      });
      builder.addCase(addProduct.fulfilled, (state, action) => {
         state.id = action.payload;
         state.addProductStatus = 'success';
      });
      builder.addCase(addProduct.rejected, (state) => {
         state.addProductStatus = 'error';
         state.id = null;
      });
   },
});

export const addedProduct = (state: RootState) => state.addProduct.id;
export const addedStatus = (state: RootState) => state.addProduct.addProductStatus;

export const { updateAddStatus } = addProductSlice.actions;

export default addProductSlice.reducer;
