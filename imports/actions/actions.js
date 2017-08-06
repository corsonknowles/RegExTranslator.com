export const RECEIVE_SRL_INPUT = 'RECEIVE_SRL_INPUT';
export const RECEIVE_SRL_INPUT_ERRORS = 'RECEIVE_SRL_INPUT_ERRORS';

export const RECEIVE_REGEX_INPUT = 'RECEIVE_REGEX_INPUT';
export const RECEIVE_REGEX_INPUT_ERRORS = 'RECEIVE_REGEX_INPUT_ERRORS';

export const receiveSrlInput = input => ({
  type: RECEIVE_SRL_INPUT,
  input
});

export const receiveSrlInputErrors = errors => ({
  type: RECEIVE_SRL_INPUT_ERRORS,
  errors
});

export const clearSrlInputErrors = () => ({
  type: RECEIVE_SRL_INPUT_ERRORS,
  errors: []
});

export const receiveRegexInput = input => ({
  type: RECEIVE_REGEX_INPUT,
  input
});

export const receiveRegexInputErrors = errors => ({
  type: RECEIVE_REGEX_INPUT_ERRORS,
  errors
});

export const clearRegexInputErrors = () => ({
  type: RECEIVE_REGEX_INPUT_ERRORS,
  errors: []
});
