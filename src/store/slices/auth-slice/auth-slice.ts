import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {TAuthSliceState} from "./auth-slice-types";
import {authSliceName} from "./auth-slice-constants";
import { authorize } from "./auth-slice-thunks";

export const authSliceInitialState: TAuthSliceState = {
  isAuthorized: !!localStorage.getItem('userId'),
  message: '',
}

export const authSlice = createSlice({
  initialState: authSliceInitialState,
  name: authSliceName,
  reducers: {
    setAuthorized(state, {payload}: PayloadAction<boolean>) {
      state.isAuthorized = payload;
    },
    setMessage(state, {payload}: PayloadAction<string>) {
      state.message = payload;
    },
    resetMessage(state) {
      state.message = '';
    }
  },
  extraReducers(builder) {
    builder.addCase(authorize.fulfilled, (state, {payload}: PayloadAction<boolean>) => {
      state.isAuthorized = payload;
  });
  },
});

export const {
  reducer: authSliceReducer,
  actions: authSliceActions,
} = authSlice;