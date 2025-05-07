import {createSelector} from "@reduxjs/toolkit";

import type {AppState} from "../../config/types";
import {taskSliceName} from "./task-slice-constants";

const selectTaskSliceState = (state: AppState) => state[taskSliceName];

export const selectTask = createSelector(
  selectTaskSliceState,
  ({task}) => task,
);
