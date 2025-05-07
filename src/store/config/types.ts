import type {ThunkDispatch} from 'redux-thunk';
import type {AnyAction} from '@reduxjs/toolkit/react';

import type {taskSliceName, TTaskSliceState} from '../slices/task-slice';

export type AppState = {
  [taskSliceName]: TTaskSliceState;
};

export type Dispatch = ThunkDispatch<AppState, undefined, AnyAction>;

export type Action<P = void> = P extends void
    ? Readonly<{type: string}>
    : Readonly<{type: string; payload: P}>;
