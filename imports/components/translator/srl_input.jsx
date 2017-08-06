import React from 'react';
import { connect } from 'react-redux';
import Srl from 'srl';
import {
  receiveSrlInput,
  receiveSrlInputErrors,
  clearSrlInputErrors,
  receiveRegexInput
} from '../../actions/actions';

const mapStateToProps = ({ srlInput: { srlInputText } }) => ({
  srlInputText
});

const mapDispatchToProps = dispatch => ({
  receiveSrlInput: input => dispatch(receiveSrlInput(input)),
  receiveSrlInputErrors: errors => dispatch(receiveSrlInputErrors(errors)),
  clearSrlInputErrors: () => dispatch(clearSrlInputErrors()),
  setRegexText: input => dispatch(receiveRegexInput(input))
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

    srlInputHandler(event) {
      this.props.receiveSrlInput(event.target.value);
      try {
        const regex = new Srl(event.target.value).get().toString();
        this.props.setRegexText(regex);
        this.props.clearSrlInputErrors();
        this.srlInputBox.style.border = null;
      } catch(error) {
        this.props.receiveSrlInputErrors([error]);
        this.srlInputBox.style.border = '1px solid Red';
      }
    }

    componentWillReceiveProps(nextProps, nextState) {
      this.setState({ srlInputText: nextProps.srlInputText });
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
