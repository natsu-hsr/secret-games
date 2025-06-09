import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ChartDataDto, MapDataDto, TTaskSliceState, TableDataDto, TilesDto, SortedFormFieldsDto} from "./task-slice-types";
import {taskSliceName} from "./task-slice-constants";
import {loadChartDataByRowId, loadFormDataByTileParams, loadMapDataByTileId, loadTableData, loadTilesData} from "./task-slice-thunks";

export const taskSliceInitialState: TTaskSliceState = {}

export const taskSlice = createSlice({
  initialState: taskSliceInitialState,
  name: taskSliceName,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadMapDataByTileId.fulfilled, (state, {payload}: PayloadAction<MapDataDto>) => {
      state.mapData = payload;
    });
    builder.addCase(loadTableData.fulfilled, (state, {payload}: PayloadAction<TableDataDto | undefined>) => {
      state.tableData = payload;
    });
    builder.addCase(loadTilesData.fulfilled, (state, {payload}: PayloadAction<TilesDto>) => {
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