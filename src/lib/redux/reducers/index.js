import defaultState from '../stateDefinitions';
import SET_HTTP_CLIENT from './setHttpClient';
import SET_TOKEN_ON_HTTP_CLIENT from './setTokenOnHttpClient';

const reducers = {
  SET_HTTP_CLIENT,
  SET_TOKEN_ON_HTTP_CLIENT,
};

export default (state = defaultState, action = {}) => {
  if (reducers[action.type] === undefined) {
    return state;
  }
  return reducers[action.type](state, action);
};
