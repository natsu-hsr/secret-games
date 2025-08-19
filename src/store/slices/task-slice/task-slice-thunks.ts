import {createAsyncThunk} from '@reduxjs/toolkit/react';

import {
  fetchMapDataByTileId,
  type FetchMapDataByTileIdArgs,
  fetchTableData,
  type FetchTableDataArgs,
  fetchTilesDataByRowId,
  type FetchDataByRowIdArgs,
  postFormData,
  type PostFormDataArgs,
  postTask,
  type PostTaskArgs,
  type FetchFormDataByTileParamsArgs,
  fetchFormDataByTileParams,
} from './task-slice-api';
import {taskSliceName} from './task-slice-constants';
import type {
  MapData,
  TableDataDto,
  TilesDataDto,
  TypedFormData,
} from './task-slice-types';
import {convertRawField, convertRawMapData, convertRawTableData, getFormType} from './task-slice-utils';

export const loadTableData = createAsyncThunk<TableDataDto | undefined, FetchTableDataArgs>(
  `${taskSliceName}/loadTableData`,
  async (args, {rejectWithValue}) => {
    try {
      const response = await fetchTableData(args);
      const {data} = response;

      return convertRawTableData({rawData: data});
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const loadTilesDataByRowId = createAsyncThunk<TilesDataDto, FetchDataByRowIdArgs>(
  `${taskSliceName}/loadTilesDataByRowId`,
  async (args, {rejectWithValue}) => {
    try {
      const response = await fetchTilesDataByRowId(args);
      const {data} = response;

      const transformedTiles = data.map(t => ({
        id: t.Card_Header_ID,
        name: t.Card_Header_Name,
        typeName: t.Card_Type_Name,
        apiName: t.Card_Type_API_Name,
        typeDescription: t.Card_Type_Description,
        columnStart: t.Column_Start,
        columnEnd: t.Column_End,
        rowStart: t.Row_Start,
        rowEnd: t.Row_End,
        color: t.Card_Color,
        disabled: !t.is_active,
      }));

      return {
        tiles: transformedTiles,
        options: {
          selectedTileId: undefined,
        }
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const loadFormDataByTileParams = createAsyncThunk<TypedFormData, FetchFormDataByTileParamsArgs>(
  `${taskSliceName}/loadFormDataByTileParams`,
  async (args, {rejectWithValue}) => {
    try {
      const response = await fetchFormDataByTileParams(args);
      const {data} = response;

      const formType = getFormType({rawFields: data});

      return {
        type: formType,
        fields: data?.map(raw => convertRawField({rawField: raw})) ?? [],
      };
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const loadMapDataByTileId = createAsyncThunk<MapData, FetchMapDataByTileIdArgs>(
  `${taskSliceName}/loadMapDataByTileId`,
  async (args, {rejectWithValue}) => {
    try {
      const response = await fetchMapDataByTileId(args);
      const {data} = response;

      return convertRawMapData(data);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

// TODO: перенести в services, think`и не нужны
/* ============== submit thunks  ============== */

export const submitFormData = createAsyncThunk<string, PostFormDataArgs>(
  `${taskSliceName}/submitFormData`,
  async (args, {rejectWithValue}) => {
    try {
      const response = await postFormData(args);
      const {data} = response;

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const submitTask = createAsyncThunk<string, PostTaskArgs>(
  `${taskSliceName}/submitTask`,
  async (args, {rejectWithValue}) => {
    try {
      const response = await postTask(args);
      const {data} = response;

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);