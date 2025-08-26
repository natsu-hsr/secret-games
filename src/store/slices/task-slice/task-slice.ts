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
  TileMarkerRoute,
} from './task-slice-types';

export const taskSliceInitialState: TTaskSliceState = {}

export const taskSlice = createSlice({
  initialState: taskSliceInitialState,
  name: taskSliceName,
  reducers: {
    resetTaskData() {
      return taskSliceInitialState;
    },
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
    setTableCommonDataWithReset(
      state, {payload}: PayloadAction<Required<Pick<TaskCommonData, 'tableRowId' | 'tableRowName'>>>
    ) {
      state.commonData = {
        tableRowId: payload.tableRowId,
        tableRowName: payload.tableRowName,
      };
      state.formData = undefined;
    },
    /** ====== common data end ====== */
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

    /** ====== TilesMarkerData ====== */
    addTileMarkerCoordinates(state, {payload}: PayloadAction<{tileId: string, coordinates: [number, number]}>) {
      const {tileId, coordinates} = payload;
      const currentTileData = state.tilesMarkerData?.[tileId];

      state.tilesMarkerData = {
        ...state.tilesMarkerData,
        [tileId]: {
          coordinates,
          routes: currentTileData?.routes ?? [],
        },
      };
    },
    addTileMarkerRoutes(state, {payload}: PayloadAction<{tileId: string, route: TileMarkerRoute}>) {
      const {tileId, route} = payload;
      const currentTileData = state.tilesMarkerData?.[tileId];

      const updatedRoutes = currentTileData?.routes?.map<TileMarkerRoute>(r => {
        if (r.toId === route.toId) {
          return {
            distance: route.distance,
            toId: route.toId,
          };
        }
        return r;
      }) ?? [];


      if (!updatedRoutes.find(ur => ur.toId === route.toId)) {
        updatedRoutes?.push(route);
      }

      state.tilesMarkerData = {
        ...state.tilesMarkerData,
        [tileId]: {
          coordinates: currentTileData?.coordinates ?? [0, 0],
          routes: updatedRoutes ?? [],
        },
      };
    },
    resetTilesMarkerCoordinates(state) {
      state.tilesMarkerData = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadMapDataByTileId.fulfilled, (state, {payload}: PayloadAction<MapData>) => {
      state.mapData = payload;
    });
    builder.addCase(loadTableData.fulfilled, (state, {payload}: PayloadAction<TableDataDto | undefined>) => {
      const firstRowId = payload?.data?.[0]?.id;
      const firstRowName = payload?.data?.[0]?.Product_Name;

      state.commonData = {
        ...state?.commonData,
        tableRowId: String(firstRowId),
        tableRowName: firstRowName ? String(firstRowName) : undefined,
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