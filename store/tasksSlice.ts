import data from '@/data/data.json';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Task = {
  id: number;
  name: string;
  description: string;
  priority: number;
  isFinished: boolean;
  listId: number;
};

export type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: data.tasks as Task[],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action: PayloadAction<number>) {
      state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const { addTask, removeTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
