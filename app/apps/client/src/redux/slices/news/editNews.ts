import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type editNews = {
   id: string;
   object: {
      name: string;
      date: string;
      time: string;
      description: string;
      free: boolean;
      price: string;
      tickets: number;
   };
   token: string;
};

export const editOneNews = createAsyncThunk('editNews/editOneNews', async (args: editNews) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   const { data } = await instance.put(`/api/news/edit/${args.id}`, { ...args.object });
   return data;
});

interface IOneNews {
   productId: string | null;
   editNewsStatus: 'loading' | 'success' | 'error';
}

const initialState: IOneNews = {
   productId: null,
   editNewsStatus: 'loading', // loading | success | error
};

export const editNewsSlice = createSlice({
   name: 'editNews',
   initialState,
   reducers: {
      updateEditStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.editNewsStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(editOneNews.pending, (state) => {
         state.editNewsStatus = 'loading';
         state.productId = null;
      });
      builder.addCase(editOneNews.fulfilled, (state, action) => {
         state.editNewsStatus = 'success';
         state.productId = action.payload;
      });
      builder.addCase(editOneNews.rejected, (state) => {
         state.editNewsStatus = 'error';
         state.productId = null;
      });
   },
});

//Alternative to useSelector
export const editNewsStatus = (state: RootState) => state.editNews.editNewsStatus;
export const productId = (state: RootState) => state.editNews.productId;

export const { updateEditStatus } = editNewsSlice.actions;

export default editNewsSlice.reducer;
