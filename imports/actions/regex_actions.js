import Regexs from '../api/regexs.js';

export const RECEIVE_REGEX = 'RECEIVE_REGEX';
export const RECEIVE_REGEX_ERRORS = 'RECEIVE_REGEX_ERRORS';
export const GET_REGEXS = 'GET_REGEXS';
export const CREATE_REGEX = 'CREATE_REGEX';

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

//N.B. Ignore async function linter errors
export function getRegexs() {
  return async function(dispatch) {
    const regexs = await
    Meteor.callPromise('regexs.fetch');

    return dispatch({
      type: 'GET_REGEXS',
      payload: regexs
    });
  }
}

export function createRegex(data) {
  return async function(dispatch) {
    const { name, pattern, language, userId } = data;
    const regexId = await Meteor.callPromise('regexs.insert', { name, pattern, language, userId });

    return dispatch({
      type: 'CREATE_REGEX',
      payload: {
        _id: regexId,
        name,
        pattern,
        language,
        userId
      }
    })
  }
}
