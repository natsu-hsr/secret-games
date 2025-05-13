import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {TFormConfig, TTask, TTaskChartData, TTaskMapData, TTaskSliceState} from "./task-slice-types";
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
    updateFormConfig(state, {payload}: PayloadAction<TFormConfig>) {
      if (!state.task) return;

      state.task.formConfig = payload;
    },
    resetTask(state) {
      state.task = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadTask.fulfilled, (state, {payload}: PayloadAction<TTask>) => {
      const preparedData: TTask = {
        ...payload,
        chartData: payload.tableData.data?.[0] ? payload.tableData.data[0].chartData : [],
        mapData: payload.tilesData?.[0] ? payload.tilesData[0].coordinates : [],
        formConfig: payload.tilesData?.[0] ? payload.tilesData[0].formConfig : undefined,
      };

      state.task = preparedData;
  });
  },
});

export const {
  reducer: taskSliceReducer,
  actions: taskSliceActions,
} = taskSlice;