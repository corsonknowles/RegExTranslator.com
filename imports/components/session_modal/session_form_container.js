import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session_form';
import { clearErrors, requestLogin, requestSignup } from '../../actions/session_actions';

const mapStateToProps = state => ({
  errors: state.session.errors
});

const mapDispatchToProps = dispatch => {

  return {
    clearErrors: () => dispatch(clearErrors()),
    processForm: (user, type) => {
      dispatch(clearErrors());
      const processForm = (type === 'login') ? requestLogin : requestSignup;
      dispatch(processForm(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
