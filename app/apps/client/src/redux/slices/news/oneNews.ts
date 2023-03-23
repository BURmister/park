import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { news } from '../../types/news.types';

export const fetchOneNews = createAsyncThunk('oneNews/fetchOneNews', async (id: string) => {
   const { data } = await axios.get(`/api/news/${id}`);
   return data;
});

interface IOneNews {
   oneNews: news | null;
   status: 'loading' | 'success' | 'error';
}

const initialState: IOneNews = {
   oneNews: null,
   status: 'loading', // loading | success | error
};

export const oneNewsSlice = createSlice({
   name: 'oneNews',
   initialState,
   reducers: {
      updateStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.status = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchOneNews.pending, (state) => {
         state.status = 'loading';
         state.oneNews = null;
      });
      builder.addCase(fetchOneNews.fulfilled, (state, action) => {
         state.status = 'success';
         state.oneNews = action.payload;
      });
      builder.addCase(fetchOneNews.rejected, (state) => {
         state.status = 'error';
         state.oneNews = null;
      });
   },
});

//Alternative to useSelector
export const getOneNews = (state: RootState) => state.oneNews.oneNews;
export const newsStatus = (state: RootState) => state.oneNews.status;

export const { updateStatus } = oneNewsSlice.actions;

export default oneNewsSlice.reducer;
