import {createSelector} from '@reduxjs/toolkit';

import {taskSliceName} from './task-slice-constants';
import type {AppState} from '../../config/types';

const selectTaskSliceState = (state: AppState) => state[taskSliceName];

export const selectTaskTableData = createSelector(
  selectTaskSliceState,
  ({tableData}) => tableData,
);

export const selectTableSelectedRowId = createSelector(
  selectTaskTableData,
  (tableData) => tableData?.options?.selectedRowId,
);

export const selectTaskMapData = createSelector(
  selectTaskSliceState,
  ({mapData}) => mapData,
);

export const selectTaskTilesData = createSelector(
  selectTaskSliceState,
  ({tilesData}) => [...(tilesData?.tiles?.length ? tilesData.tiles : [])],
);

export const selectSelectedTileId = createSelector(
  selectTaskSliceState,
  ({tilesData}) => tilesData?.options?.selectedTileId,
);

export const selectTaskCommonData = createSelector(
  selectTaskSliceState,
  ({commonData}) => commonData,
);

export const selectFormData = createSelector(
  selectTaskSliceState,
  ({formData}) => formData,
);