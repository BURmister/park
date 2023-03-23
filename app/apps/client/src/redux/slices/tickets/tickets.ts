import { urlAPI } from '../../../api/api.constants';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../store';

type addTickets = {
   eventId: string;
   name: string;
   date: string;
   time: string;
   buyerName: string;
   buyerTel: string;
   amount: string;
   buyerEmail: string;
};

export const addTickets = createAsyncThunk('addTickets', async (args: addTickets) => {
   const { data } = await axios.post(`/api/tickets/add`, { ...args });
   return data;
});

interface IAddTickets {
   id: string | null;
   addTicketsStatus: 'loading' | 'success' | 'error';
}

const initialState: IAddTickets = {
   id: null,
   addTicketsStatus: 'loading', // loading | success | error
};

export const addTicketsSlice = createSlice({
   name: 'addTickets',
   initialState,
   reducers: {
      updateAddStatus: (state, action: PayloadAction<'loading' | 'success' | 'error'>) => {
         state.addTicketsStatus = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(addTickets.pending, (state) => {
         state.addTicketsStatus = 'loading';
      });
      builder.addCase(addTickets.fulfilled, (state, action) => {
         state.id = action.payload;
         state.addTicketsStatus = 'success';
      });
      builder.addCase(addTickets.rejected, (state) => {
         state.addTicketsStatus = 'error';
         state.id = null;
      });
   },
});

export const addedTickets = (state: RootState) => state.addTickets.id;
export const addedStatus = (state: RootState) => state.addTickets.addTicketsStatus;

export const { updateAddStatus } = addTicketsSlice.actions;

export default addTicketsSlice.reducer;
