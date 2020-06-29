export default (storeState, {payload}) => {
  let newState = Object.assign({}, storeState);

  newState.lastErrorDescription = payload.messages;

  return newState;
};