/* eslint-disable @typescript-eslint/no-explicit-any */
import {createSelector, createSlice, type PayloadAction} from '@reduxjs/toolkit';

import type {AppState} from '../../../store/config/types';

import {loadingStateSliceName} from './loading-state-slice-constants';

const extractTypeParts = (type: string) => {
    const typeSplit = type.split('/');
    const [
        sliceName,
        thunkName,
        status,
    ] = [typeSplit?.[0], typeSplit?.[1], typeSplit?.[2] as LoadingStatus];
    return {sliceName, thunkName, status};
};

export type LoadingStatus = 'rejected' | 'pending' | 'fulfilled';
export type ThunkRejectionError = {
    data: any;
    status: number;
    statusText: string;
    isAborted: boolean;
}
export interface LoadingStateSliceState {
    statuses: {[index: string]: LoadingStatus};
    errors: {[index: string]: ThunkRejectionError | undefined};
}

export const loadingStateSlice = createSlice({
    initialState: {
        statuses: {},
        errors: {},
    } as LoadingStateSliceState,
    name: loadingStateSliceName,
    extraReducers: builder => {
        builder.addMatcher((action: PayloadAction<any>) => {
            const {sliceName, status, thunkName} = extractTypeParts(action.type);
            if (sliceName && thunkName && status) return true;
            return false;
        }, (state, action: any) => {
            const {sliceName, status, thunkName} = extractTypeParts(action.type);
            state.statuses[`${sliceName}/${thunkName}`] = status as LoadingStatus;

            if (status === 'rejected') {
                const response = action.payload?.response ?? {};
                const {data, statusText} = response;
                state.errors[`${sliceName}/${thunkName}`] = {
                    data,
                    status: response.status,
                    statusText,
                    isAborted: (action as any)?.error?.name === 'AbortError',
                };
            } else {
                state.errors[`${sliceName}/${thunkName}`] = undefined;
            }
        });
    },
    reducers: {},
});

const selectLoadingStateSliceState = (state: AppState) => state[loadingStateSliceName];

export const selectThunkStatuses = createSelector(
    selectLoadingStateSliceState,
    state => state.statuses,
);

export const selectThunkErrors = createSelector(
    selectLoadingStateSliceState,
    state => state.errors,
);

export const selectIsThunkPending = createSelector(
    [
        selectThunkStatuses,
        (_, thunkName: string) => thunkName,
    ],
    (statuses, thunkName) => statuses[thunkName] === 'pending',
);

export const selectIsThunkRejected = createSelector(
    [
        selectThunkStatuses,
        (_, thunkName: string) => thunkName,
    ],
    (statuses, thunkName) => statuses[thunkName] === 'rejected',
);

export const selectThunkError = createSelector(
    [
        selectThunkErrors,
        (_, thunkName: string) => thunkName,
    ],
    (errors, thunkName) => errors[thunkName],
);

export const selectThunkStatus = createSelector(
    [
        selectThunkStatuses,
        selectThunkErrors,
        (_, thunkName: string) => thunkName,
    ],
    (statuses, errors, thunkName) => ({
        isPending: statuses[thunkName] === 'pending',
        isFulfilled: statuses[thunkName] === 'fulfilled',
        isRejected: statuses[thunkName] === 'rejected',
        error: errors[thunkName],
    }),
);

export const {reducer: loadingStateSliceReducer} = loadingStateSlice;
