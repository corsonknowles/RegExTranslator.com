import React from 'react';
import { connect } from 'react-redux';
import Srl from 'srl';
import {
  receiveSrl,
  receiveSrlErrors,
  clearSrlErrors
} from '../../actions/srl_actions';
import {
  receiveRegex,
  receiveRegexFlags
} from '../../actions/regex_actions';
import helpText from '../../webcopy/help_text';
import glossary from '../../webcopy/glossary';
import { engToSrl } from './english_translator';

const mapStateToProps = ({ srl: { srlText, errors } }) => ({
  srlText,
  errors
});

const mapDispatchToProps = dispatch => ({
  receiveSrl: input => dispatch(receiveSrl(input)),
  receiveSrlErrors: errors => dispatch(receiveSrlErrors(errors)),
  clearSrlErrors: () => dispatch(clearSrlErrors()),
  setRegex: regexText => dispatch(receiveRegex(regexText)),
  setRegexFlags: flags => dispatch(receiveRegexFlags(flags))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        srlInputText: this.props.srlText,
        helpText: helpText,
        glossary: glossary
      };

      this.srlInputHandler = this.srlInputHandler.bind(this);
    }

    componentWillReceiveProps(nextProps, nextState) {
      this.setState({ srlInputText: nextProps.srlText });
    }

    srlInputHandler(event) {
      // Set SRL slice
      this.props.receiveSrl(event.target.value);

      const srl = engToSrl(event.target.value);
      try {
        // NOTE: Error causing line
        const regex = new Srl(srl);

        // Get regex data for state
        const regexText = regex.getRawRegex();
        const flags = regex._modifiers.split('');

        // Set regex to SRL-translated version and clear errors
        this.props.setRegex(regexText);
        this.props.setRegexFlags(flags);
        this.props.clearSrlErrors();
      } catch(error) {
        // If SRL parsing fails, set errors
        this.props.receiveSrlErrors(['Invalid SRL syntax', error]);
      }
    }

    render() {
      let swapButton = <div />;
      let classes = [];
      if (this.props.idx === 0) {
        swapButton = <button onClick={() => this.props.swap()}>Swap</button>;
        classes.push('editable');
      }

      if (this.props.errors.length > 0) {
        classes.push('error');
      }

      return (
        <div className="translator-input-section">
          <header>
            <h2>Simpler Regex Language</h2>
            {swapButton}
          </header>

          <textarea
            onChange={this.srlInputHandler}
            value={this.state.srlInputText}
            disabled={this.props.idx !== 0}
            autoFocus={this.props.idx === 0}
            className={classes.join(' ')}>
          </textarea>

          <textarea
            className="help-text"
            value={this.state.helpText}
            disabled>
          </textarea>

          <textarea
            className="help-text"
            value={this.state.glossary}
            disabled>
          </textarea>
        </div>
      );
    }
  }
);
