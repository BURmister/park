import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';
import { news } from '../../types/news.types';

export const fetchNews = createAsyncThunk('news/fetchNews', async (term?: number) => {
   const instance = axios.create({});
   const { data } = await instance.get(`/api/news/all${term ? `?term=${term}` : ''}`);
   return data;
});

interface INews {
   news: news[];
   status: 'loading' | 'success' | 'error';
}

const initialState: INews = {
   news: [],
   status: 'loading', // loading | success | error
};

export const newsSlice = createSlice({
   name: 'news',
   initialState,
   reducers: {
      updateStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.status = action.payload;
      },
      filterNews: (state, action: PayloadAction<string>) => {
         state.news = state.news.filter((news) => news._id !== action.payload);
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchNews.pending, (state) => {
         state.status = 'loading';
         state.news = [];
      });
      builder.addCase(fetchNews.fulfilled, (state, action) => {
         state.status = 'success';
         state.news = action.payload;
      });
      builder.addCase(fetchNews.rejected, (state) => {
         state.status = 'error';
         state.news = [];
      });
   },
});

//Alternative to useSelector
export const getNews = (state: RootState) => state.news.news;
export const newsStatus = (state: RootState) => state.news.status;

export const { updateStatus } = newsSlice.actions;
export const { filterNews } = newsSlice.actions;

export default newsSlice.reducer;
