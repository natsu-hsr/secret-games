import {createSelector} from "@reduxjs/toolkit";

import type {AppState} from "../../config/types";
import {authSliceName} from "./auth-slice-constants";

const selectAuthSliceState = (state: AppState) => state[authSliceName];

export const selectAuthorizedStatus = createSelector(
  selectAuthSliceState,
  ({isAuthorized}) => isAuthorized,
);

export const selectAuthMessage = createSelector(
  selectAuthSliceState,
  ({message}) => message,
);
