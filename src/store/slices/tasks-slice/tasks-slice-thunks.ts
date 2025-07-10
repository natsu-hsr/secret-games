import {createAsyncThunk} from '@reduxjs/toolkit';

import {fetchTasksByUserId, type FetchTasksByUserIdArgs} from './tasks-slice-api';
import {tasksSliceName} from './tasks-slice-constants';
import type {TasksDto} from './tasks-slice-types';
import {convertRawTasks} from './tasks-slice-utils';

export const loadTasksByUserId = createAsyncThunk<TasksDto, FetchTasksByUserIdArgs>(
  `${tasksSliceName}/loadTasksByUserId`,
  async (args, {rejectWithValue}) => {
    try {
      const response = await fetchTasksByUserId(args);
      const {data} = response;

      const convertedTasks = convertRawTasks({rawTasks: data});

      return convertedTasks;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);