import React from 'react';
import { connect } from 'react-redux';
import {
  receiveSrlInput,
  receiveRegexInput
} from '../../actions/actions';

const mapStateToProps = ({ regexInput: { regexInputText } }) => ({
  regexInputText
});

const mapDispatchToProps = dispatch => ({
  receiveSrlInput: input => dispatch(receiveSrlInput(input)),
  receiveRegexInput: input => dispatch(receiveRegexInput(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        regexInputText: this.props.regexInputText
      };

      this.regexInputHandler = this.regexInputHandler.bind(this);
    }

    regexInputHandler(event) {
      this.props.receiveRegexInput(event.target.value);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ regexInputText: nextProps.regexInputText });
    }

    render() {
      return (
        <div className="translator-input-section">
          <h2>Regular Expression</h2>
          <textarea
            onChange={this.regexInputHandler}
            value={this.state.regexInputText}
          />
        </div>
      );
    }
  }
);
