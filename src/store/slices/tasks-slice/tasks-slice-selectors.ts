import {createSelector} from '@reduxjs/toolkit';

import {tasksSliceName} from './tasks-slice-constants';
import type {AppState} from '../../config/types';

const selectTasksSliceState = (state: AppState) => state[tasksSliceName];

export const selectTasks = createSelector(
  selectTasksSliceState,
  ({tasks}) => tasks,
);