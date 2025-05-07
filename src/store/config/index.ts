import {configureStore} from '@reduxjs/toolkit';

import {appReducer, rootReducer} from './reducers';
import {taskSliceName, taskSliceInitialState} from '../slices/task-slice';

const createInitialState = () => {
    return {
        ...appReducer(undefined, {type: '@@INIT'}),
        [taskSliceName]: taskSliceInitialState,
    };
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: createInitialState(),
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: {
            ignoreActions: true,
        },
    }),
});
