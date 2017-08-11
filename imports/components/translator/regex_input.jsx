import React from 'react';
import { connect } from 'react-redux';
import { receiveSrl } from '../../actions/srl_actions';
import {
  receiveRegex,
  receiveRegexErrors,
  clearRegexInputErrors,
  getRegexs,
  createRegex
} from '../../actions/regex_actions';
import PatternDropdown from './pattern_dropdown';
import { regexToSrl } from '../../api/translator';

const mapStateToProps = (state) => ({
  regexText: state.regex.regexText,
  regexs: state.regexs,
  errors: state.regex.errors
});

const mapDispatchToProps = dispatch => ({
  receiveRegex: input => dispatch(receiveRegex(input)),
  receiveRegexErrors: errors => dispatch(receiveRegexErrors(errors)),
  clearRegexInputErrors: () => dispatch(clearRegexInputErrors()),
  getRegexs: () => dispatch(getRegexs()),
  createRegex: (data) => dispatch(createRegex(data)),
  setSrl: srlText => dispatch(receiveSrl(srlText))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        regexInputText: this.props.regexText,
        regexSaved: false
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
      // Set regex slice
      this.props.receiveRegex(event.target.value);

      try {
        // NOTE: Error causing line
        const srlText = regexToSrl(event.target.value);

        // Set regex to reverse-translated version and clear errors
        this.props.setSrl(srlText);
        this.props.clearRegexInputErrors();
      } catch(error) {
        // If regex parsing fails, set errors
        this.props.receiveRegexErrors(['Invalid regex syntax', error]);
      }

    }

    regexSelector(pattern) {
      this.setState({ regexInputText: pattern });
    }

    render() {
      //Initialize a variable to hold our PatternDropdown component (if
      // we've received our regexs)
      let DropdownComponent;
      if (Object.keys(this.props.regexs).length > 0) {
        DropdownComponent = (
          <PatternDropdown
            regexs={this.props.regexs}
            regexSelector={this.regexSelector}
          />
        );
      } else {
        DropdownComponent = <div />;
      }

      let swapButton = <div />;
      let klasses = [];
      if (this.props.idx === 0) {
        swapButton = <button onClick={() => this.props.swap()}>Swap</button>;
        klasses.push('editable');
      }

      if (this.props.errors.length > 0) {
        klasses.push('error');
      }

      return (
        <div className="translator-input-section">
          <header>
            <h2>Regular Expression</h2>
            {swapButton}
          </header>

          <textarea
            onChange={this.regexInputHandler}
            value={this.state.regexInputText}
            disabled={this.props.idx !== 0}
            autoFocus={this.props.idx === 0}
            className={klasses.join(' ')}
          />

          <footer>
            <img className="save" src={`img/${'outline'}-star.png`} />
          </footer>
        </div>
      );
    }
  }
);
