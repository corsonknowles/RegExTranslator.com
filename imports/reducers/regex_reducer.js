import {
  RECEIVE_REGEX_INPUT,
  RECEIVE_REGEX_INPUT_ERRORS
} from '../actions/actions';

const defaultState = {
  regexInputText: '',
  errors: []
};

export default (state = defaultState, action) => {
  Object.freeze(state);
  const stateCopy = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_REGEX_INPUT:
      return Object.assign(stateCopy, { regexInputText: action.input });

    case RECEIVE_REGEX_INPUT_ERRORS:
      return Object.assign(stateCopy, { errors: action.errors });

    default:
      return stateCopy;
  }
};
