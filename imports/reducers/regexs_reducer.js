import {
  GET_REGEXS,
  CREATE_REGEX
} from '../actions/regex_actions.js';


export default (state = {}, action) => {
  Object.freeze(state);
  const stateCopy = Object.assign({}, state);

  switch (action.type) {
    case GET_REGEXS:
      return Object.assign(stateCopy, action.payload);

    case CREATE_REGEX:
      return Object.assign(stateCopy, action.payload);

    default:
      return stateCopy;
  }
};
