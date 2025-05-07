import {createSelector} from "@reduxjs/toolkit";
// import omitBy from "lodash/omitBy";

import {ordersSliceName} from "./orders-slice-constants";
import {TOrder} from "./orders-slice-types";
import {AppState} from "../../config/types";

const selectOrdersSliceState = (state: AppState) => state[ordersSliceName];

export const selectRawOrdersData = createSelector(
    selectOrdersSliceState,
    ({allData}) => allData,
);

export const selectOrdersAppliedFilters = createSelector(
  selectOrdersSliceState,
  ({appliedFilters}) => appliedFilters,
);

export const selectOrdersData = createSelector(
  [
    state => state.orders.allData,
    state => state.orders.appliedFilters
  ],
  (allData, appliedFilters) => {
    if (!allData) return [];

    // Убираем falsy-значения фильтров
    const cleanedFilters = omitBy(
      appliedFilters,
      value => value === undefined || value === null || value === "",
    );

    if (Object.keys(cleanedFilters).length === 0) {
      return allData;
    }

    return allData.filter((order: TOrder) =>
      Object.entries(cleanedFilters).every(([key, value]) => {
        const orderValue = order[key as keyof TOrder];
        return String(orderValue).toLowerCase() === String(value).toLowerCase();
      })
    );
  }
);