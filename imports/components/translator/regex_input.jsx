import React from 'react';
import { connect } from 'react-redux';
import {
  receiveSrlInput,
  receiveRegexInput
} from '../../actions/actions';

const mapStateToProps = ({ regexInput: { regex } }) => ({
  regex
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
        regexInputText: this.props.regex.toString().split('/')[1]
      };

      this.regexInputHandler = this.regexInputHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        regexInputText: nextProps.regex.toString().split('/')[1]
      });
    }

    regexInputHandler(event) {
      this.props.receiveRegexInput(event.target.value);
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
