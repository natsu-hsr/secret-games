import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import {taskSliceName} from './task-slice-constants';
import {
  loadFormDataByTileParams,
  loadMapDataByTileId,
  loadTableData,
  loadTilesDataByRowId,
} from './task-slice-thunks';
import type {
  TTaskSliceState,
  TableDataDto,
  TilesDataDto,
  TaskCommonData,
  TypedFormData,
  FormFieldsDto,
  MapData,
} from './task-slice-types';

export const taskSliceInitialState: TTaskSliceState = {}

export const taskSlice = createSlice({
  initialState: taskSliceInitialState,
  name: taskSliceName,
  reducers: {
    /** ====== Common data ====== */
    setTilesCommonData(
      state,
      {payload}: PayloadAction<Required<Pick<TaskCommonData, 'tileId' | 'tileApiName' | 'selectedPlacemarkId'>>>
    ) {
      state.commonData = {
        ...state?.commonData,
        tileId: payload.tileId,
        tileApiName: payload.tileApiName,
        selectedPlacemarkId: payload.selectedPlacemarkId,
      };
    },
    setTableCommonDataWithReset(state, {payload}: PayloadAction<Required<Pick<TaskCommonData, 'tableRowId'>>>) {
      state.commonData = {
        tableRowId: payload.tableRowId,
      };
      state.formData = undefined;
    },
    updateFormFields(state, {payload}: PayloadAction<FormFieldsDto>) {
      if (!state.formData?.fields) {
        return;
      }

      state.formData.fields = state.formData.fields.map(old => {
        const updated = payload.find(updated => updated.name === old.name);
        if (!updated) {
          return old;
        };

        return updated;
      });
    },
    resetFormData(state) {
      state.formData = undefined;
    },
    resetMapData(state) {
      state.mapData = undefined;
    },

    /** ====== TilesMarkerCoordinates ====== */
    setTilesMarkerCoordinates(state, {payload}: PayloadAction<Record<string, [number, number]>>) {
      state.tilesMarkerCoordinates = payload;
    },
    addTileMarkerCoordinates(state, {payload}: PayloadAction<{tileId: string, coordinates: [number, number]}>) {
      const {tileId, coordinates} = payload;
      state.tilesMarkerCoordinates = {
        ...state.tilesMarkerCoordinates,
        [tileId]: coordinates,
      };
    },
    resetTilesMarkerCoordinates(state) {
      state.tilesMarkerCoordinates = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadMapDataByTileId.fulfilled, (state, {payload}: PayloadAction<MapData>) => {
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
    builder.addCase(loadFormDataByTileParams.fulfilled, (state, {payload}: PayloadAction<TypedFormData>) => {
      state.formData = payload;
    });
  },
});

export const {
  reducer: taskSliceReducer,
  actions: taskSliceActions,
} = taskSlice;