export default (storeState, { payload }) => {
  let newState = Object.assign({}, storeState);
  newState.locale = payload;

  return newState;
};
