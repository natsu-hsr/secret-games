import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import {authSliceName} from './auth-slice-constants';
import {authorize} from './auth-slice-thunks';
import type {TAuthSliceState, UserWithAuthorizedFlag} from './auth-slice-types';

export const authSliceInitialState: TAuthSliceState = {
  isAuthorized: !!localStorage.getItem('userId'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? '') : null,
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
    builder.addCase(authorize.fulfilled, (state, {payload}: PayloadAction<UserWithAuthorizedFlag>) => {
      const {isAuthorized, userId, username} = payload;

      state.isAuthorized = isAuthorized;
      state.user = {
        userId,
        username,
      }
  });
  },
});

export const {
  reducer: authSliceReducer,
  actions: authSliceActions,
} = authSlice;