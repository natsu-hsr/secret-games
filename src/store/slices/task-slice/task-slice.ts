import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ChartDataDto, MapDataDto, TTaskSliceState, TableDataDto, TilesDto, SortedFormFieldsDto, FormFieldsDto} from "./task-slice-types";
import {taskSliceName} from "./task-slice-constants";
import {loadChartDataByRowId, loadFormDataByTileParams, loadMapDataByTileId, loadTableData, loadTilesDataByRowId} from "./task-slice-thunks";

export const taskSliceInitialState: TTaskSliceState = {}

export const taskSlice = createSlice({
  initialState: taskSliceInitialState,
  name: taskSliceName,
  reducers: {
    setCurrentTableRowId(state, {payload}: PayloadAction<string>) {
      if (state.tableData?.currentRowId) {
        state.tableData.currentRowId = payload;
      }
    },
    setRegularFormFields(state, {payload}: PayloadAction<FormFieldsDto>) {
      if (state.formConfig?.regularFields) {
        state.formConfig.regularFields = payload;
      }
    },
    resetFormFields(state) {
      state.formConfig = undefined;
    },
    resetMapData(state) {
      state.mapData = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadMapDataByTileId.fulfilled, (state, {payload}: PayloadAction<MapDataDto>) => {
      state.mapData = payload;
    });
    builder.addCase(loadTableData.fulfilled, (state, {payload}: PayloadAction<TableDataDto | undefined>) => {
      state.tableData = payload;
    });
    builder.addCase(loadTilesDataByRowId.fulfilled, (state, {payload}: PayloadAction<TilesDto>) => {
      state.tilesData = payload;
    });
    builder.addCase(loadChartDataByRowId.fulfilled, (state, {payload}: PayloadAction<ChartDataDto>) => {
      state.chartData = payload;
    });
    builder.addCase(loadFormDataByTileParams.fulfilled, (state, {payload}: PayloadAction<SortedFormFieldsDto>) => {
      state.formConfig = payload;
    });
  },
});

export const {
  reducer: taskSliceReducer,
  actions: taskSliceActions,
} = taskSlice;