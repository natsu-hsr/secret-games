export type {
    ThunkRejectionError,
    LoadingStateSliceState,
} from './loading-state-slice';

export {
    loadingStateSliceReducer,
    selectIsThunkPending,
    selectIsThunkRejected,
    selectThunkError,
    selectThunkStatus,
} from './loading-state-slice';

export {loadingStateSliceName} from './loading-state-slice-constants';
