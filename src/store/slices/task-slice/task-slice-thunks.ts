import {createAsyncThunk} from "@reduxjs/toolkit/react";
import type {TTask} from "./task-slice-types";
import {fetchTask, type FetchTaskArgs} from "./task-slice-api";
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