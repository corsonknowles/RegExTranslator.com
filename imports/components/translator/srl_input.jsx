import React from 'react';
import { connect } from 'react-redux';
import Srl from 'srl';
import {
  receiveSrlInput,
  receiveSrlInputErrors,
  clearSrlInputErrors,
  receiveRegexInput
} from '../../actions/actions';

const mapStateToProps = ({ srlInput: { srlText } }) => ({
  srlText
});

const mapDispatchToProps = dispatch => ({
  receiveSrlInput: input => dispatch(receiveSrlInput(input)),
  receiveSrlInputErrors: errors => dispatch(receiveSrlInputErrors(errors)),
  clearSrlInputErrors: () => dispatch(clearSrlInputErrors()),
  setRegex: input => dispatch(receiveRegexInput(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        srlInputText: this.props.srlInputText
      };

      this.srlInputHandler = this.srlInputHandler.bind(this);
    }

    componentWillReceiveProps(nextProps, nextState) {
      this.setState({ srlInputText: nextProps.srlInputText });
    }

    srlInputHandler(event) {
      this.props.receiveSrlInput(event.target.value);
      try {
        const regEx = new Srl(event.target.value).raw()._result;
        this.props.setRegex(regEx);
        this.props.clearSrlInputErrors();
        this.srlInputBox.style.border = null;
      } catch(error) {
        this.props.receiveSrlInputErrors([error]);
        this.srlInputBox.style.border = '1px solid Red';
      }
    }

    render() {
      return (
        <div className="translator-input-section">
          <h2>Simple Regex Language</h2>
          <textarea
            ref={el => { this.srlInputBox = el; }}
            onChange={this.srlInputHandler}
            value={this.state.srlInputText}
          />
        </div>
      );
    }
  }
);
