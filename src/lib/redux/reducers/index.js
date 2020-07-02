import defaultState from '../stateDefinitions';
import SET_HTTP_CLIENT from './setHttpClient';
import SET_TOKEN_ON_HTTP_CLIENT from './setTokenOnHttpClient';
import INITIALIZE_DONE from './initializeDone';
import UPDATE_ME from './updateMe';
import UPDATE_IDENTITY from './updateIdentity';
import RAISE_ERROR from './raiseError';
import LOGOUT from './logout';
import IS_REQUESTING from './isRequesting';
import ON_CHANGE_LANGUAGE from './onChangeLanguage';

const reducers = {
  SET_HTTP_CLIENT,
  SET_TOKEN_ON_HTTP_CLIENT,
  LOGOUT,
  IS_REQUESTING,
  RAISE_ERROR,
  INITIALIZE_DONE,
  UPDATE_ME,
  UPDATE_IDENTITY,
  ON_CHANGE_LANGUAGE
};

export default (state = defaultState, action = {}) => {
  if (reducers[action.type] === undefined) {
    return state;
  }
  return reducers[action.type](state, action);
};
