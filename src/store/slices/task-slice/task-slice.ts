import {createSlice} from "@reduxjs/toolkit";
import type {TTaskSliceState} from "./task-slice-types";
import {taskSliceName} from "./task-slice-constants";
import {loadTask} from "./task-slice-thunks";

export const taskSliceInitialState: TTaskSliceState = {
  task: undefined,
}

export const taskSlice = createSlice({
  initialState: taskSliceInitialState,
  name: taskSliceName,
  reducers: {
    resetTask(state) {
      state.task = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadTask.fulfilled, (state, {payload}) => {
      state.task = payload;
  });
  },
});

export const {
  reducer: taskSliceReducer,
  actions: taskSliceActions,
} = taskSlice;