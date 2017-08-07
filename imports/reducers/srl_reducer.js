import {
  RECEIVE_SRL_INPUT,
  RECEIVE_SRL_INPUT_ERRORS
} from '../actions/actions';

const defaultState = {
  srlText: '',
  errors: []
};

export default (state = defaultState, action) => {
  Object.freeze(state);
  const stateCopy = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_SRL_INPUT:
      return Object.assign(stateCopy, { srlText: action.input });

    case RECEIVE_SRL_INPUT_ERRORS:
      return Object.assign(stateCopy, { errors: action.errors });

    default:
      return stateCopy;
  }
};
