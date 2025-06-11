import {convertRawFormFields, convertRawTableData} from './task-slice-utils';
import {createAsyncThunk} from "@reduxjs/toolkit/react";
import type {ChartDataDto, MapDataDto, TableDataDto, TTask, TilesDto, SortedFormFieldsDto} from "./task-slice-types";
import {
  fetchTask,
  type FetchTaskArgs,
  fetchMapDataByTileId,
  type FetchMapDataByTileIdArgs,
  fetchTableData,
  type FetchTableDataArgs,
  fetchTilesDataByRowId,
  type FetchDataByRowIdArgs,
  fetchChartDataByRowId,
  type FetchFormDataByTileParamsArgs,
  fetchFormDataByTileParams,
} from "./task-slice-api";
import {taskSliceName} from "./task-slice-constants";

export const loadTask = createAsyncThunk<TTask, FetchTaskArgs>(
  `${taskSliceName}/loadTask`,
  async (arg, {rejectWithValue}) => {
    try {
      const response = await fetchTask(arg);
      const {data} = response;
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

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

export const loadTilesDataByRowId = createAsyncThunk<TilesDto, FetchDataByRowIdArgs>(
  `${taskSliceName}/loadTilesDataByRowId`,
  async (args, {rejectWithValue}) => {
    try {
      const response = await fetchTilesDataByRowId(args);
      const {data} = response;

      return data.map(t => ({
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

export const loadFormDataByTileParams = createAsyncThunk<SortedFormFieldsDto, FetchFormDataByTileParamsArgs>(
  `${taskSliceName}/loadFormDataByTileParams`,
  async (args, {rejectWithValue}) => {
    try {
      const response = await fetchFormDataByTileParams(args);
      const {data} = response;

      const convertedData = convertRawFormFields({rawFormFields: data});

      console.log('form convertedData=', convertedData)
      return convertedData;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);