import React from 'react';
import { connect } from 'react-redux';
import { receiveRegex } from '../../actions/regex_actions';
import { Regexs } from '../../api/regexs';

const mapStateToProps = ({ regex: { regexText } }) => ({
  regexText,
  patterns: Regexs.find().fetch()
});

const mapDispatchToProps = dispatch => ({
  receiveRegex: input => dispatch(receiveRegex(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        regexInputText: this.props.regexText
      };

      this.regexInputHandler = this.regexInputHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ regexInputText: nextProps.regexText });
    }

    regexInputHandler(event) {
      this.props.receiveRegex(event.target.value);
      // TODO: Run reverse translation here
    }

    render() {
      debugger;
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
