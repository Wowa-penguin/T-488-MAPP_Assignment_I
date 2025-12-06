import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './boardSlice';
import listsReducer from './listsSlice';
import moveReducer from './moveSlice';
import tasksReducer from './tasksSlice';

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
    tasks: tasksReducer,
    move: moveReducer,
  },
});

// Types (TS only)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
