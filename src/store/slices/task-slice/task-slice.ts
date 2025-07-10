import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import {taskSliceName} from './task-slice-constants';
import {
  loadChartDataByRowId,
  loadFormDataByTileParams,
  loadMapDataByTileId,
  loadTableData,
  loadTilesDataByRowId,
} from './task-slice-thunks';
import type {
  ChartDataDto,
  MapDataDto,
  TTaskSliceState,
  TableDataDto,
  SortedFormFieldsDto,
  FormFieldsDto,
  TilesDataDto,
} from './task-slice-types';

export const taskSliceInitialState: TTaskSliceState = {}

export const taskSlice = createSlice({
  initialState: taskSliceInitialState,
  name: taskSliceName,
  reducers: {
    setSelectedTableRowId(state, {payload}: PayloadAction<string>) {
      if (state.tableData?.options) {
        state.tableData.options = {
          selectedRowId: payload,
        }
      }
    },
    setSelectedTileId(state, {payload}: PayloadAction<string>) {
      if (state.tilesData?.options) {
        state.tilesData.options = {
          selectedTileId: payload,
        }
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
    builder.addCase(loadTilesDataByRowId.fulfilled, (state, {payload}: PayloadAction<TilesDataDto>) => {
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