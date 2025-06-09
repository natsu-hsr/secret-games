import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import { tasksSliceName } from "./tasks-slice-constants";
import type { ScriptListDto, TasksSliceState } from "./tasks-slice-types";
import { loadTasksByUserId } from "./tasks-slice-thunks";

export const tasksSliceInitialState: TasksSliceState = {
  tasks: undefined,
};

export const tasksSlice = createSlice({
  initialState: tasksSliceInitialState,
  name: tasksSliceName,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(loadTasksByUserId.fulfilled, (state, {payload}: PayloadAction<ScriptListDto>) => {
      state.tasks = payload;
    });
  },
});

export const {
  reducer: tasksSliceReducer,
  actions: tasksSliceActions,
} = tasksSlice;