import {createSelector} from "@reduxjs/toolkit";

import type {AppState} from "../../config/types";
import {taskSliceName} from "./task-slice-constants";

const selectTaskSliceState = (state: AppState) => state[taskSliceName];

// export const selectTask = createSelector(
//   selectTaskSliceState,
//   ({task}) => task,
// );

export const selectTaskTableData = createSelector(
  selectTaskSliceState,
  ({tableData}) => tableData,
);

export const selectTaskMapData = createSelector(
  selectTaskSliceState,
  ({mapData}) => mapData,
);

export const selectTaskTilesData = createSelector(
  selectTaskSliceState,
  ({tilesData}) => tilesData,
);

export const selectTaskChartData = createSelector(
  selectTaskSliceState,
  ({chartData}) => chartData,
);

export const selectFormConfigData = createSelector(
  selectTaskSliceState,
  ({formConfig}) => formConfig,
);