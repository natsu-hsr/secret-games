import {createAsyncThunk} from "@reduxjs/toolkit";
import type {ScriptListDto} from "./tasks-slice-types";
import {tasksSliceName} from "./tasks-slice-constants";
import {fetchTasksByUserId, type FetchTasksByUserIdArgs} from "./tasks-slice-api";

export const loadTasksByUserId = createAsyncThunk<ScriptListDto, FetchTasksByUserIdArgs>(
  `${tasksSliceName}/loadTasksByUserId`,
  async (args, {rejectWithValue}) => {
    try {
      const response = await fetchTasksByUserId(args);
      // const {data} = response;

      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);