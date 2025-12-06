import data from '@/data/data.json';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type List = {
  id: number;
  name: string;
  color: string;
  boardId: number;
};

export type ListsSttate = {
  lists: List[];
};

const initialState: ListsSttate = {
  lists: data.lists as List[],
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList(state, action: PayloadAction<List>) {
      state.lists.push(action.payload);
    },
    removeList(state, action: PayloadAction<number>) {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
    },
    updateList(state, action: PayloadAction<List>) {
      const index = state.lists.findIndex(
        (list) => list.id === action.payload.id
      );
      if (index !== -1) {
        state.lists[index] = action.payload;
      }
    },
    changeName(state, action: PayloadAction<{ id: number; newName: string }>) {
      const index = state.lists.findIndex(
        (list) => list.id === action.payload.id
      );
      if (index !== -1) {
        state.lists[index] = {
          ...state.lists[index],
          name: action.payload.newName,
        };
      }
    },
  },
});

export const { addList, removeList, updateList, changeName } =
  listsSlice.actions;
export default listsSlice.reducer;
