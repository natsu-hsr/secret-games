import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {TTask, TTaskChartData, TTaskMapData, TTaskSliceState} from "./task-slice-types";
import {taskSliceName} from "./task-slice-constants";
import {loadTask} from "./task-slice-thunks";

export const taskSliceInitialState: TTaskSliceState = {
  task: undefined,
}

export const taskSlice = createSlice({
  initialState: taskSliceInitialState,
  name: taskSliceName,
  reducers: {
    updateMapData(state, {payload}: PayloadAction<TTaskMapData>) {
      if (!state.task) return;

      state.task.mapData = payload;
    },
    updateChartData(state, {payload}: PayloadAction<TTaskChartData>) {
      if (!state.task) return;

      state.task.chartData = payload;
    },
    resetTask(state) {
      state.task = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadTask.fulfilled, (state, {payload}: PayloadAction<TTask>) => {
      const preparedData: TTask = {
        ...payload,
        mapData: payload.tilesData?.[0] ? payload.tilesData[0].coordinates : [],
        chartData: payload.tableData.data?.[0] ? payload.tableData.data[0].chartData : [],
      };

      state.task = preparedData;
  });
  },
});

export const {
  reducer: taskSliceReducer,
  actions: taskSliceActions,
} = taskSlice;