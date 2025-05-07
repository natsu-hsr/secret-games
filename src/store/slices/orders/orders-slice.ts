import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {TOrders, TOrderFilters, TOrdersSliceState} from "./orders-slice-types";
import {ordersSliceName} from "./orders-slice-constants";

export const ordersSlice = createSlice({
  initialState: {
      appliedFilters: undefined,
      data: undefined,
      allData: undefined,
  } as TOrdersSliceState,
  name: ordersSliceName,
  reducers: {
    setData(state, {payload}: PayloadAction<TOrders>) {
      state.data = payload;
    },
    setFilters(state, {payload}: PayloadAction<TOrderFilters>) {
      state.appliedFilters = payload;
    },
    resetFilters(state) {
      state.appliedFilters = undefined;
    },
  },
});

export const {
  reducer: ordersSliceReducer,
  actions: ordersSliceActions,
} = ordersSlice;