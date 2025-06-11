import {createAsyncThunk} from "@reduxjs/toolkit";
import type {TasksDto} from "./tasks-slice-types";
import {tasksSliceName} from "./tasks-slice-constants";
import {fetchTasksByUserId, type FetchTasksByUserIdArgs} from "./tasks-slice-api";
import { convertRawTasks } from "./tasks-slice-utils";

export const loadTasksByUserId = createAsyncThunk<TasksDto, FetchTasksByUserIdArgs>(
  `${tasksSliceName}/loadTasksByUserId`,
  async (args, {rejectWithValue}) => {
    try {
      const response = await fetchTasksByUserId(args);
      const {data} = response;

      const convertedTasks = convertRawTasks({rawTasks: data});

      console.log('convertedTasks=', convertedTasks);

      return convertedTasks;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);