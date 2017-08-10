import React from 'react';
import { connect } from 'react-redux';
import { receiveRegex, getRegexs, createRegex } from '../../actions/regex_actions';
import PatternDropdown from './pattern_dropdown.jsx';

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
      this.regexSelector = this.regexSelector.bind(this);
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

    regexSelector(pattern) {
      this.setState({ regexInputText: pattern });
    }

    render() {
      //Initialize a variable to hold our PatternDropdown component (if
      // we've received our regexs)
      let DropdownComponent;
      if (Object.keys(this.props.regexs).length > 0) {
        DropdownComponent = <PatternDropdown
                            regexs={this.props.regexs}
                            regexSelector={this.regexSelector} />;
      } else {
        DropdownComponent = <div />;
      }

      return (
        <div className="translator-container">
          <div className="translator-input-section">
            <h2>Regular Expression</h2>
            <textarea
              onChange={this.regexInputHandler}
              value={this.state.regexInputText}
            />
          </div>
          {DropdownComponent}
        </div>
      );
    }
  }
);
