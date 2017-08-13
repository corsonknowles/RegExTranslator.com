import React from 'react';
import { connect } from 'react-redux';
import Srl from 'srl';
import {
  receiveSrl,
  receiveSrlErrors,
  clearSrlInputErrors
} from '../../actions/srl_actions';
import {
  receiveRegex,
  receiveRegexFlags
} from '../../actions/regex_actions';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

const mapStateToProps = ({ srl: { srlText, errors } }) => ({
  srlText,
  errors
});

const mapDispatchToProps = dispatch => ({
  receiveSrl: input => dispatch(receiveSrl(input)),
  receiveSrlErrors: errors => dispatch(receiveSrlErrors(errors)),
  clearSrlInputErrors: () => dispatch(clearSrlInputErrors()),
  setRegex: regexText => dispatch(receiveRegex(regexText)),
  setRegexFlags: flags => dispatch(receiveRegexFlags(flags))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        srlInputText: this.props.srlText,
        options: [
          'any character',
          'any of',
          'anything',
          'at least',
          'between',
          'capture',
          'atb',
          'case insensitive',
          'digit',
          'digit from',
          'either of',
          'exactly',
          'if followed by',
          'if not followed by',
          'letter',
          'letter from',
          'literally',
          'must end',
          'multi line',
          'never or more',
          'new line',
          'no character',
          'no whitespace',
          'number from',
          'once',
          'one of',
          'optional',
          'once or more',
          'raw',
          'twice',
          'starts with',
          'until',
          'uppercase',
          'uppercase letter from',
          'whitespace'
        ]
      };

      this.srlInputHandler = this.srlInputHandler.bind(this);
      this.handleRequestOptions = this.handleRequestOptions.bind(this);

    }

    componentWillReceiveProps(nextProps, nextState) {
      this.setState({ srlInputText: nextProps.srlText });
    }

    handleRequestOptions(part) {
      // console.log(part);
      this.setState({ options: [
        'any character',
        'any of',
        'anything',
        'at least',
        'between',
        'capture',
        'atb',
        'case insensitive',
        'digit',
        'digit from',
        'either of',
        'exactly',
        'if followed by',
        'if not followed by',
        'letter',
        'letter from',
        'literally',
        'must end',
        'multi line',
        'never or more',
        'new line',
        'no character',
        'no whitespace',
        'number from',
        'once',
        'one of',
        'optional',
        'once or more',
        'raw',
        'twice',
        'starts with',
        'until',
        'uppercase',
        'uppercase letter from',
        'whitespace'
      ] });
    }

    srlInputHandler(event) {
      // Set SRL slice
      console.log(event);
      this.props.receiveSrl(event.target.value);

      try {
        // NOTE: Error causing line
        const regex = new Srl(event.target.value);

        // Get regex data for state
        const regexText = regex.getRawRegex();
        const flags = regex._modifiers.split('');

        // Set regex to SRL-translated version and clear errors
        this.props.setRegex(regexText);
        this.props.setRegexFlags(flags);
        this.props.clearSrlInputErrors();
      } catch(error) {
        // If SRL parsing fails, set errors
        this.props.receiveSrlErrors(['Invalid SRL syntax', error]);
      }
    }

    render() {
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
            <h2>Simple Regex Language</h2>
            {swapButton}
          </header>

          <TextInput
            onChange={this.srlInputHandler}
            value={this.state.srlInputText}
            disabled={this.props.idx !== 0}
            autoFocus={this.props.idx === 0}
            className={klasses.join(' ')}
            options={this.state.options}
          />
        </div>
      );
    }
  }
);
