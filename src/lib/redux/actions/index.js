import {createAction} from 'redux-actions';

export const setHttpClient = createAction('SET_HTTP_CLIENT');
export const setTokenOnHttpClient = createAction('SET_TOKEN_ON_HTTP_CLIENT');
export const updateMe = createAction('UPDATE_ME');
export const updateIdentity = createAction('UPDATE_IDENTITY');
export const isRequesting = createAction('IS_REQUESTING');
export const raiseError = createAction('RAISE_ERROR');
export const logout = createAction('LOGOUT');
export const initializeDone = createAction('INITIALIZE_DONE');