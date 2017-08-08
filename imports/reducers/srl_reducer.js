import {
  RECEIVE_SRL,
  RECEIVE_SRL_ERRORS
} from '../actions/srl_actions';

const defaultState = {
  srlText: '',
  errors: []
};

export default (state = defaultState, action) => {
  Object.freeze(state);
  const stateCopy = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_SRL:
      return Object.assign(stateCopy, { srlText: action.input });

    case RECEIVE_SRL_ERRORS:
      return Object.assign(stateCopy, { errors: action.errors });

    default:
      return stateCopy;
  }
};
