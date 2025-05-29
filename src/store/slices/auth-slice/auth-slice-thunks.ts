import {createAsyncThunk} from "@reduxjs/toolkit/react";
import {authorize as authorizeRequest, type AuthorizeArgs} from "./auth-slice-api";
import {authSliceName} from "./auth-slice-constants";
import {authSliceActions} from './auth-slice'

export const authorize = createAsyncThunk<boolean, AuthorizeArgs>(
  `${authSliceName}/authorize`,
  async (args, {dispatch, rejectWithValue}) => {
    try {
      const {login, password} = args;

      // todo: костыль для gh-pages
      if (login === 'test' && password === 'test') {
        localStorage.setItem('isAuthorized', '1');
        return true;
      }


      const response = await authorizeRequest(args);
      const {data} = response;

      if (data === 1) {
        localStorage.setItem('isAuthorized', '1');
      } else {
        console.log('here=1231');
        dispatch(authSliceActions.setMessage('Логин или пароль не совпадают или не найдены'))
        localStorage.removeItem('isAuthorized');
      }

      return !!data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const logout = createAsyncThunk(
  '${authSliceName}/logout',
  async (_, { dispatch }) => {
    localStorage.removeItem('isAuthorized');
    dispatch(authSliceActions.setAuthorized(false));
  }
);