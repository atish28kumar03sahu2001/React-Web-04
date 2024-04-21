import { configureStore } from "@reduxjs/toolkit";
import mailReducer from './MailSlice';
export const store = configureStore({
    reducer: {
      mail: mailReducer,
    },
  });