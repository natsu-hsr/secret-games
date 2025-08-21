import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import {tasksSliceName} from './tasks-slice-constants';
import {loadTaskStatus, loadTasksByUserId} from './tasks-slice-thunks';
import type {TasksDto, TasksSliceState} from './tasks-slice-types';

export const tasksSliceInitialState: TasksSliceState = {
  tasks: undefined,
};

export const tasksSlice = createSlice({
  initialState: tasksSliceInitialState,
  name: tasksSliceName,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(loadTasksByUserId.fulfilled, (state, {payload}: PayloadAction<TasksDto>) => {
      state.tasks = payload;
    });
    builder.addCase(loadTaskStatus.fulfilled, (state, action) => {
      const {scriptId, stageId} = action.meta.arg;
      const newStatus = action.payload;

      const existedScript = state.tasks
        ?.find(sc => sc.id === scriptId)
        ?.stages?.find(st => st.id === stageId);

      if (existedScript) {
        existedScript.disabled = newStatus === 0;
        existedScript.pending = newStatus === 2;
        existedScript.hasResults = newStatus === 3;
      }

    });
  },
});

export const {
  reducer: tasksSliceReducer,
  actions: tasksSliceActions,
} = tasksSlice;