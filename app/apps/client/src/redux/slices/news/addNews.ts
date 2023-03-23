import { urlAPI } from '../../../api/api.constants';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type addNews = {
   object: {
      name: string;
      description: string;
      date: string;
   };
   token: string;
};

export const addNews = createAsyncThunk('addNews', async (args: addNews) => {
   const { data } = await axios.post(`/api/news/add`, { ...args.object }, { headers: { Authorization: 'Bearer ' + args.token } });
   return data;
});

interface IAddNews {
   id: string | null;
   addNewsStatus: 'loading' | 'success' | 'error';
}

const initialState: IAddNews = {
   id: null,
   addNewsStatus: 'loading', // loading | success | error
};

export const addNewsSlice = createSlice({
   name: 'addNews',
   initialState,
   reducers: {
      updateAddStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.addNewsStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(addNews.pending, (state) => {
         state.addNewsStatus = 'loading';
      });
      builder.addCase(addNews.fulfilled, (state, action) => {
         state.id = action.payload;
         state.addNewsStatus = 'success';
      });
      builder.addCase(addNews.rejected, (state) => {
         state.addNewsStatus = 'error';
         state.id = null;
      });
   },
});

export const addedNews = (state: RootState) => state.addNews.id;
export const addedNewsStatus = (state: RootState) => state.addNews.addNewsStatus;

export const { updateAddStatus } = addNewsSlice.actions;

export default addNewsSlice.reducer;
