import {createAsyncThunk} from '@reduxjs/toolkit/react';

import {
  fetchMapDataByTileId,
  type FetchMapDataByTileIdArgs,
  fetchTableData,
  type FetchTableDataArgs,
  fetchTilesDataByRowId,
  type FetchDataByRowIdArgs,
  fetchChartDataByRowId,
  postFormData,
  type PostFormDataArgs,
  postTask,
  type PostTaskArgs,
} from './task-slice-api';
import {taskSliceName} from './task-slice-constants';
import type {
  ChartDataDto,
  MapDataDto,
  TableDataDto,
  TilesDataDto,
} from './task-slice-types';
import {convertRawTableData} from './task-slice-utils';

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

export const loadChartDataByRowId = createAsyncThunk<ChartDataDto, FetchDataByRowIdArgs>(
  `${taskSliceName}/loadChartDataByRowId`,
  async (args, {rejectWithValue}) => {
    try {
      const response = await fetchChartDataByRowId(args);
      const {data} = response;

      return data.map(d => ({
        name: String(d.Time_Value),
        y: +d.Demand,
      }));
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
        color: t.Cell_Color,
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

export const loadMapDataByTileId = createAsyncThunk<MapDataDto, FetchMapDataByTileIdArgs>(
  `${taskSliceName}/loadMapDataByTileId`,
  async (args, {rejectWithValue}) => {
    try {
      const response = await fetchMapDataByTileId(args);
      const {data} = response;

      return data.map(m => ({
        id: m.Knot_ID,
        name: m.Knot_Name,
        coordinates: [+(m.Knot_Latitude.replace(',', '.')), +m.Knot_Longitude.replace(',', '.')],
        labelType: m.label_type,
        draggable: m.draggable === 'true',
      }));
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

// TODO: вынести в redux-query
// export const loadFormDataByTileParams = createAsyncThunk<TypedRawFormFields, FetchFormDataByTileParamsArgs>(
//   `${taskSliceName}/loadFormDataByTileParams`,
//   async (args, {rejectWithValue}) => {
//     try {
//       const response = await fetchFormDataByTileParams(args);
//       const {data} = response;

//       const formType = getFormType({rawFormFields: data});

//       return {
//         type: formType,
//         rawFields: data,
//       };

//       // const convertedData = convertRawFormFields({rawFormFields: data});

//       // return convertedData;
//     } catch (e) {
//       return rejectWithValue(e);
//     }
//   },
// );

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