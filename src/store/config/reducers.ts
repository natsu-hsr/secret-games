import {combineReducers} from 'redux';
import type {Action} from 'redux';

import {authSliceReducer, authSliceName} from '../slices/auth-slice';
import {loadingStateSliceName, loadingStateSliceReducer} from '../slices/loading-state-slice';
import {taskSliceName, taskSliceReducer} from '../slices/task-slice';
import {tasksSliceName, tasksSliceReducer} from '../slices/tasks-slice';

const RESET_ACTION_TYPE = 'RESET';

export const appReducer = combineReducers({
  [authSliceName]: authSliceReducer,
  [taskSliceName]: taskSliceReducer,
  [tasksSliceName]: tasksSliceReducer,
  [loadingStateSliceName]: loadingStateSliceReducer,
});

export const resetStore = () => ({type: RESET_ACTION_TYPE});

export const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: Action<string>) => {
  if (action.type === RESET_ACTION_TYPE) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};
