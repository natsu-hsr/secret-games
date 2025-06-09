import {createSelector} from "@reduxjs/toolkit";
import type {AppState} from "../../config/types";
import {tasksSliceName} from "./tasks-slice-constants";

const selectTasksSliceState = (state: AppState) => state[tasksSliceName];

export const selectTasks = createSelector(
  selectTasksSliceState,
  ({tasks}) => tasks,
);