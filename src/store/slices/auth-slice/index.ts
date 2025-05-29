export {authSliceName} from './auth-slice-constants';
export {selectAuthMessage, selectAuthorizedStatus} from './auth-slice-selectors';
export type {TAuthForm,TAuthSliceState, TRegisterForm} from './auth-slice-types';
export {authorize, logout} from './auth-slice-thunks'
export {register} from './auth-slice-api';
export {authSlice, authSliceReducer, authSliceActions} from './auth-slice';