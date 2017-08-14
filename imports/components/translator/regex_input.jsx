import React from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { receiveSrl } from '../../actions/srl_actions';
import {
  receiveRegex,
  receiveRegexErrors,
  clearRegexErrors,
  getRegexs,
  createRegex
} from '../../actions/regex_actions';
import PatternDropdown from './pattern_dropdown';
import { regexToSrl } from '../../api/translator';
import SaveButton from './save_button';
import RegexExample from '../regex_example';

const mapStateToProps = (state) => ({
  regexText: state.regex.regexText,
  regexs: state.regexs,
  errors: state.regex.errors
});

const mapDispatchToProps = dispatch => ({
  receiveRegex: input => dispatch(receiveRegex(input)),
  receiveRegexErrors: errors => dispatch(receiveRegexErrors(errors)),
  clearRegexErrors: () => dispatch(clearRegexErrors()),
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
        regexSaved: false,
        userSwitch: false
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
      this.regexInputHandler(event.target.value);
    }

    registerRegexInput(pattern) {
      // Set regex slice
      this.props.receiveRegex(pattern);

      try {
        // NOTE: Error causing line
        const srlText = regexToSrl(pattern);

        // Set regex to reverse-translated version and clear errors
        this.props.setSrl(srlText);
        this.props.clearRegexErrors();
      } catch(error) {
        // If regex parsing fails, set errors
        this.props.receiveRegexErrors(['Invalid regex syntax', error]);
      }
    }

    //Set the regex input text to the selected prebuilt pattern
    regexSelector(pattern) {
      this.registerRegexInput(pattern);
    }

    render() {
      //Initialize a variable to hold our PatternDropdown component (if
      // we've received our regexs)
      let DropdownComponent;
      if (Object.keys(this.props.regexs).length > 0) {
        DropdownComponent = <PatternDropdown
                            regexs={this.props.regexs}
                            regexSelector={this.regexSelector}
                            getRegexs={this.props.getRegexs}
                            swapped={this.props.swapped}
                            />;
      } else {
        DropdownComponent = <div />;
      }

      let swapButton = <div />;
      let classes = ['code'];
      if (this.props.idx === 0) {
        swapButton = <button onClick={() => this.props.swap()}>Swap</button>;
        classes.push('editable');

        if (this.props.errors.length > 0) {
          classes.push('error');
        }
      }

      let SaveComponent;
      if (Meteor.userId()) {
        SaveComponent = <SaveButton createRegex={this.props.createRegex}
                                    getRegexs={this.props.getRegexs}
                                    pattern={this.state.regexInputText}
                                    language="javascript"
                                    userId={Meteor.userId}/>;
      } else {
        SaveComponent = <div className="save-bar"/>;
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
            className={classes.join(' ')}
          />

          {SaveComponent}
          {DropdownComponent}

          <header>
            <h2>Regex Demo</h2>
          </header>
          <RegexExample />
        </div>
      );
    }
  }
);
