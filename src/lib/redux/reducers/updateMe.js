export default (state, {payload}) => {
  let newState = Object.assign({}, state);
  newState.me = payload.me;

  return newState;
};
