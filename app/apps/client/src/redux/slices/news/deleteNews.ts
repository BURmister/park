import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type deleteNews = {
   id: string;
   token: string;
};

export const deleteOneNews = createAsyncThunk('deleteNews/deleteOneNews', async (args: deleteNews) => {
   const instance = axios.create({
      headers: {
         Authorization: 'Bearer ' + args.token,
      },
   });
   const { data } = await instance.put(`/api/news/delete/${args.id}`);
   return data;
});

interface IOneNews {
   newsTitle: { _id: string; name: string } | null;
   deleteStatus: 'loading' | 'success' | 'error';
}

const initialState: IOneNews = {
   newsTitle: null,
   deleteStatus: 'loading', // loading | success | error
};

export const deleteNewsSlice = createSlice({
   name: 'deleteNews',
   initialState,
   reducers: {
      updateDeleteStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.deleteStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(deleteOneNews.pending, (state) => {
         state.deleteStatus = 'loading';
         state.newsTitle = null;
      });
      builder.addCase(deleteOneNews.fulfilled, (state, action) => {
         state.deleteStatus = 'success';
         state.newsTitle = action.payload;
      });
      builder.addCase(deleteOneNews.rejected, (state) => {
         state.deleteStatus = 'error';
         state.newsTitle = null;
      });
   },
});

//Alternative to useSelector
export const deleteStatus = (state: RootState) => state.deleteNews.deleteStatus;
export const newsTitle = (state: RootState) => state.deleteNews.newsTitle;

export const { updateDeleteStatus } = deleteNewsSlice.actions;

export default deleteNewsSlice.reducer;
