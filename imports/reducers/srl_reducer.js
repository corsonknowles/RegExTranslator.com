export default (state, action) => {
  Object.freeze(state);

  const stateCopy = Object.assign({}, state);

  switch (action.type) {
    default:
      return stateCopy;
  }
};
