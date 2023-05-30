import {configureStore} from '@reduxjs/toolkit';
import cardReducer from './reduxCardSlice';

export default configureStore({
  reducer: {
    cards: cardReducer,
  }
});