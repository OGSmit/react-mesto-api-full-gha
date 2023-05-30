import { createSlice } from '@reduxjs/toolkit';

const reduxCardSlice = createSlice({
  name: 'reduxCards',
  initialState: {
    reduxCards: [],
  },
  reducers: {
    addCard(state, action) {
      state.reduxCards.push(action.payload.element);
    },
    setCard(state, action) {
      state.reduxCards = action.payload
  }
  },
});

export const { addCard, setCard } = reduxCardSlice.actions;

export default reduxCardSlice.reducer;