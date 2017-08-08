export const RECEIVE_REGEX = 'RECEIVE_REGEX';
export const RECEIVE_REGEX_ERRORS = 'RECEIVE_REGEX_ERRORS';

export const receiveRegex = input => ({
  type: RECEIVE_REGEX,
  input
});

export const receiveRegexErrors = errors => ({
  type: RECEIVE_REGEX_ERRORS,
  errors
});

export const clearRegexInputErrors = () => ({
  type: RECEIVE_REGEX_ERRORS,
  errors: []
});
