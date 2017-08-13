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

      const srl = engToSrl(event.target.value.replace(/\n/g, ' '));
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
              className={klasses.join(' ')}
          />
          <div className="help-text">

            Glossary:<br />
          any character \\w<br />
        any of (a, b, c) (a|b|c)<br />
      anything .<br />
    at least 8 times &#123;8,&#125;<br />
  backslash \\<br />
            between 3 and 7 times &#123;3,7&#125;<br />
          capture a (a)<br />
        case insensitive /myRegex/i<br />
      digit \\d<br />
    digit from 3 to 5 [3-5]<br />
  either of (x, y, z) (x|y|z)<br />
            exactly once &#123;1&#125;<br />
          exactly twice &#123;2&#125;<br />
        exactly 4 times &#123;4&#125;<br />
      if followed by -> capture (digit) if followed by (any character) -> /([0-9])(?=\\w)/<br />
    if not followed by -> capture (letter) if not followed by (digit) /([a-z])(?![0-9])/<br />
  letter [a-z]<br />
            letter from g to m [g-m]<br />
          literally "a string to match" -> (?:a string to match)<br />
        multi line /yourRegex/m<br />
      must end $<br />
    never or more *<br />
  new line \\n<br />
            no character \\W<br />
          no whitespace \\S<br />
        number from -> number from 4 to 6 -> [4-6]<br />
      once &#123;1&#125;<br />
    one of "defg1234" [defg1234]<br />
  optional ?<br />
            once or more +<br />
          raw "[a-zA-Z]" -> [a-zA-Z]<br />
        starts with ^<br />
      tab \\t<br />
    twice,<br />
  until -> capture (anything once or more) until "." -> (.+?)(?:\.)<br />
            uppercase letter [A-Z]<br />
          uppercase letter from M to P [M-P]<br />
        whitespace \\s<br />


          </div>
          <div className="help-text">
            {this.state.glossary}
          </div>
        </div>
      );
    }
  }
);
