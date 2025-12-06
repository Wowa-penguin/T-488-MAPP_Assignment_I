import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Move = {
  move: boolean;
};

const initialState: Move = {
  move: false,
};

const moveSlice = createSlice({
  name: 'move',
  initialState,
  reducers: {
    changeMove(state, action: PayloadAction<boolean>) {
      state.move = action.payload;
    },
  },
});

export const { changeMove } = moveSlice.actions;
export default moveSlice.reducer;
