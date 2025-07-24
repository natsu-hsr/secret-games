import {createSelector} from '@reduxjs/toolkit';

import {authSliceName} from './auth-slice-constants';
import type {AppState} from '../../config/types';

const selectAuthSliceState = (state: AppState) => state[authSliceName];

export const selectAuthorizedStatus = createSelector(
  selectAuthSliceState,
  ({isAuthorized}) => isAuthorized,
);

export const selectUser = createSelector(
  selectAuthSliceState,
  ({user}) => user,
);

export const selectAuthMessage = createSelector(
  selectAuthSliceState,
  ({message}) => message,
);
