export const RECEIVE_SRL = 'RECEIVE_SRL';
export const RECEIVE_SRL_ERRORS = 'RECEIVE_SRL_ERRORS';

export const receiveSrl = input => ({
  type: RECEIVE_SRL,
  input
});

export const receiveSrlErrors = errors => ({
  type: RECEIVE_SRL_ERRORS,
  errors
});

export const clearSrlInputErrors = () => ({
  type: RECEIVE_SRL_ERRORS,
  errors: []
});
