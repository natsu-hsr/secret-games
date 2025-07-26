import {createAsyncThunk} from '@reduxjs/toolkit/react';

import {authSliceActions} from './auth-slice'
import {authorize as authorizeRequest, type AuthorizeArgs} from './auth-slice-api';
import {authSliceName} from './auth-slice-constants';
import type {UserWithAuthorizedFlag} from './auth-slice-types';

export const authorize = createAsyncThunk<UserWithAuthorizedFlag, AuthorizeArgs>(
  `${authSliceName}/authorize`,
  async (args, {dispatch, rejectWithValue}) => {
    try {
      const response = await authorizeRequest(args);
      const {data} = response;

      const {user_id, user_name, pass_match} = data[0];

      if (pass_match === 1) {
        localStorage.setItem('userId', String(user_id));
        localStorage.setItem('user', JSON.stringify({userId: user_id, username: user_name,}));
      } else {
        dispatch(authSliceActions.setMessage('Логин или пароль не совпадают или не найдены'))
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
      }

      return {
        userId: user_id,
        username: user_name,
        isAuthorized: pass_match === 1,
      };
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const logout = createAsyncThunk(
  '${authSliceName}/logout',
  async (_, {dispatch}) => {
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    dispatch(authSliceActions.setAuthorized(false));
  }
);