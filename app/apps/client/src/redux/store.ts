import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import productsReducer from './slices/products/products.slice';
import oneProductReducer from './slices/products/oneProduct.slice';
import deleteProductReducer from './slices/products/deleteProduct.slice';
import addProductReducer from './slices/products/addProduct.slice';
import editProductReducer from './slices/products/editProduct.slice'

import newsReducer from './slices/news/news'
import oneNewsReducer from './slices/news/oneNews'
import editNewsReducer from './slices/news/editNews'
import deleteNewsReducer from './slices/news/deleteNews'
import addNewsReducer from './slices/news/addNews'

import addTicketsReducer from './slices/tickets/tickets';

import authReducer from './slices/auth/auth.slice';

import usersReducer from './slices/users/users.slice';
import oneUserReducer from './slices/users/oneUser.slice';
import deleteUserReducer from './slices/users/deleteUser.slice';
import addUserReducer from './slices/users/addUser.slice';
import editUserReducer from './slices/users/editUser.slice';


export const store = configureStore({
   reducer: {
      products: productsReducer,
      oneProduct: oneProductReducer,
      deleteProduct: deleteProductReducer,
      addProduct: addProductReducer,
      editProduct: editProductReducer,

      news: newsReducer,
      oneNews: oneNewsReducer,
      editNews: editNewsReducer,
      deleteNews: deleteNewsReducer,
      addNews: addNewsReducer,

      addTickets: addTicketsReducer,
      
      users: usersReducer,
      oneUser: oneUserReducer,
      deleteUser: deleteUserReducer,
      addUser: addUserReducer,
      editUser: editUserReducer,

      auth: authReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
