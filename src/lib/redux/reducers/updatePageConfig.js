const availablePages = [
  'configOfTodo'
];

export default (storeState, {payload}) => {
  let newState = Object.assign({}, storeState);
  if (availablePages.includes(payload.name)) {
    newState[payload.name] = payload.config;
  }
  return newState;
};
