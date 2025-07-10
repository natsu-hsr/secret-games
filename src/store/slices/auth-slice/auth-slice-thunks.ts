import {createAsyncThunk} from '@reduxjs/toolkit/react';

import {authSliceActions} from './auth-slice'
import {authorize as authorizeRequest, type AuthorizeArgs} from './auth-slice-api';
import {authSliceName} from './auth-slice-constants';

export const authorize = createAsyncThunk<boolean, AuthorizeArgs>(
  `${authSliceName}/authorize`,
  async (args, {dispatch, rejectWithValue}) => {
    try {
      const response = await authorizeRequest(args);
      const {data} = response;

      if (data) {
        localStorage.setItem('userId', data);
      } else {
        dispatch(authSliceActions.setMessage('Логин или пароль не совпадают или не найдены'))
        localStorage.removeItem('userId');
      }

      return !!data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const logout = createAsyncThunk(
  '${authSliceName}/logout',
  async (_, {dispatch}) => {
    localStorage.removeItem('userId');
    dispatch(authSliceActions.setAuthorized(false));
  }
);