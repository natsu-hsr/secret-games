import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import {taskSliceName} from './task-slice-constants';
import {
  loadChartDataByRowId,
  loadMapDataByTileId,
  loadTableData,
  loadTilesDataByRowId,
} from './task-slice-thunks';
import type {
  ChartDataDto,
  MapDataDto,
  TTaskSliceState,
  TableDataDto,
  FormFieldsDto,
  TilesDataDto,
  TaskCommonData,
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
    setTilesCommonData(state, {payload}: PayloadAction<Required<Pick<TaskCommonData, 'tileId' | 'tileApiName'>>>) {
      state.commonData = {
        ...state?.commonData,
        tileId: payload.tileId,
        tileApiName: payload.tileApiName,
      };
    },
    setTableCommonDataWithReset(state, {payload}: PayloadAction<Required<Pick<TaskCommonData, 'tableRowId'>>>) {
      state.commonData = {
        tableRowId: payload.tableRowId,
      };
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
      const firstRowId = payload?.data?.[0]?.id;
      state.commonData = {
        ...state?.commonData,
        tableRowId: String(firstRowId),
      };
      state.tableData = payload;
    });
    builder.addCase(loadTilesDataByRowId.fulfilled, (state, {payload}: PayloadAction<TilesDataDto>) => {
      state.tilesData = payload;
    });
    builder.addCase(loadChartDataByRowId.fulfilled, (state, {payload}: PayloadAction<ChartDataDto>) => {
      state.chartData = payload;
    });
    // builder.addCase(loadFormDataByTileParams.fulfilled, (state, {payload}: PayloadAction<SortedFormFieldsDto>) => {
    //   state.formConfig = payload;
    // });
  },
});

export const {
  reducer: taskSliceReducer,
  actions: taskSliceActions,
} = taskSlice;