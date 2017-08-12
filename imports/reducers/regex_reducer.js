import {
  RECEIVE_REGEX,
  RECEIVE_REGEX_FLAGS,
  RECEIVE_REGEX_ERRORS
} from '../actions/regex_actions';

const defaultState = {
  regexText: '(?:)',
  regexFlags: ['g'],
  errors: []
};

export default (state = defaultState, action) => {
  Object.freeze(state);
  const stateCopy = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_REGEX:
      return Object.assign(stateCopy, { regexText: action.input });

    case RECEIVE_REGEX_FLAGS:
      return Object.assign(stateCopy, { regexFlags: action.flags });

    case RECEIVE_REGEX_ERRORS:
      return Object.assign(stateCopy, { errors: action.errors });

    default:
      return stateCopy;
  }
};
