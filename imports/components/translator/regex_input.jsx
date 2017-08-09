import React from 'react';
import { connect } from 'react-redux';
import { receiveRegex, getRegexs, createRegex } from '../../actions/regex_actions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => ({
  regexText: state.regex.regexText,
  regexs: state.regexs
});

const mapDispatchToProps = dispatch => ({
  receiveRegex: input => dispatch(receiveRegex(input)),
  getRegexs: () => dispatch(getRegexs()),
  createRegex: (data) => dispatch(createRegex(data))
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

    componentDidMount() {
      this.props.getRegexs();
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
