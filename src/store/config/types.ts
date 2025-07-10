import type {ThunkDispatch} from 'redux-thunk';

import type {AnyAction} from '@reduxjs/toolkit/react';

import type {TAuthSliceState} from '../slices/auth-slice';
import type {authSliceName} from '../slices/auth-slice/auth-slice-constants';
import type {loadingStateSliceName, LoadingStateSliceState} from '../slices/loading-state-slice';
import type {taskSliceName, TTaskSliceState} from '../slices/task-slice';
import type {tasksSliceName} from '../slices/tasks-slice/tasks-slice-constants';
import type {TasksSliceState} from '../slices/tasks-slice/tasks-slice-types';

export type AppState = {
  [authSliceName]: TAuthSliceState;
  [taskSliceName]: TTaskSliceState;
  [tasksSliceName]: TasksSliceState;
  [loadingStateSliceName]: LoadingStateSliceState;
};

export type Dispatch = ThunkDispatch<AppState, undefined, AnyAction>;

export type Action<P = void> = P extends void
    ? Readonly<{type: string}>
    : Readonly<{type: string; payload: P}>;
