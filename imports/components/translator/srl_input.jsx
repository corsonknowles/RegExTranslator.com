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
        console.error(error);
        // If SRL parsing fails, set errors
        this.props.receiveSrlErrors(['Invalid SRL syntax', error]);
      }
    }

    render() {
      let swapButton = <div />;
      let classes = ['code'];
      if (this.props.idx === 0) {
        swapButton = <button onClick={() => this.props.swap()}>Swap</button>;
        classes.push('editable');

        if (this.props.errors.length > 0) {
          classes.push('error');
        }
      }

      const helpTextContent = [
        ["(?:abc)", "literally abc"],
        ["[abc]", "one of \"abc\""],
        ["[^abc]", "none of abc"],
        ["[^abc]", "raw [^abc]"],
        ["[a-z]", "letter"],
        ["[A-Z]", "uppercase"],
        ["plain text string", 'literally "plain text string"'],
        ["(letter)", "capture (letter)"],
        ["^", "begin with"],
        ["$", "must end"],
        ["?", "optional"],
        [".", "anything"],
        [null, null],
        ["Quantifiers", null],
        ["+", "one or more"],
        ["*", "never or more"],
        ["{1}", "once"],
        ["{2}", "twice"],
        ["{3}", "exactly 3 times"],
        ["{3,}", "at least 3 times"],
        ["{3,6}", "between 3 and 6 times"],
        [null, null],
        ["Character classes", null],
        ["\\d", "digit"],
        ["\\D", "no digit"],
        ["\\w", "any character"],
        ["\\W", "no character"],
        ["\\s", "whitespace"],
        ["\\S", "no whitespace"],
        ["\\b", "word"],
        ["\\B", "no word"],
        ["\\n", "new line"],
        ["\\t", "tab"],
        ["\\v", "vertical tab"],
        ["\\ Use a backslash for characters that usually have special handling. You can escape that character and it will be treated literally. For example \\d will match a digit, while \\\\d will match a string that has a backslash followed by the letter d.", "backslash"],
        [null, null],
        ["Flags", null],
        ["/regex/m", "multi line"],
        ["/regex/i", "case insensitive"],
        [null, null],
        ["Coming Soon...", null],
        ["\\r", "carriage return"],
        ["(?:a)(?=(?:X))", "literally a if followed by X"],
        ["(?:b)(?!(?:Y))", "literally a if not followed by Y"],
        [null, null],
        ["Not supported", null],
        ["\\1", "Referencing a captured group"],
        ["\\b", "backspace"],
        ["\\0", "Null character"],
        ["\\cX", "crtl-X"],
        ["\\uDDDD", "unicode character DDDD"],
        ["\\f", "form feed"]
      ];

      const glossaryContent = [
        ["any character", "\\w"],
        ["any of (letter, digit)", "(?:[a-z]|[0-9])"],
        ["anything", "."],
        ["at least 3 times", "{3,}"],
        ["backslash", "\\"],
        ["between 3 and 6 times", "{3,6}"],
        ["capture a", "(a)"],
        ["case insensitive", "/regex/i"],
        ["digit", "\\d"],
        ["digit from 3 to 5", "[3-5]"],
        ["either of (digit, letter)", "(?:[0-9]|[a-z])"],
        ["exactly 3", "{3}"],
        ["exactly 4 times", "{4}"],
        ["letter", "[a-z]"],
        ["letter from g to m", "[g-m]"],
        ["literally \"stuff\"", "(?:stuff)"],
        ["multi line", "/regex/m"],
        ["must end", "$"],
        ["never or more", "*"],
        ["new line", "\\n"],
        ["no character", "\\W"],
        ["no whitespace", "\\S"],
        ["no word", "\\W"],
        ["number from 3 to 6", "[3-6]"],
        ["once", "{1}"],
        ["once or more", "+"],
        ["one of \"defg123\"", "[defg123]"],
        ["optional", "?"],
        ["raw [a-zA-Z]", "[a-zA-Z]"],
        ["starts with", "^"],
        ["tab", "\\t"],
        ["twice", "{2}"],
        ["uppercase", "[A-Z]"],
        ["uppercase letter from D to Y", "[D-Y]"],
        ["vertical tab", "\\v"],
        ["whitespace", "\\s"],
        ["word", "\\b"]
      ];

    return (
        <div className="translator-input-section">
          <header>
            <h2>Simple Regex Language</h2>
            {swapButton}
          </header>

          <textarea
            onChange={this.srlInputHandler}
            value={this.state.srlInputText}
            disabled={this.props.idx !== 0}
            autoFocus={this.props.idx === 0}
            className={classes.join(' ')} />

          <header>
            <h2 className="help-header">Syntax: Regex vs Simple Regex Language</h2>
          </header>

          <div className="help-text">
            {helpTextContent.map(pair => {
              return (
                <div className="row">
                  {pair[0]? (<div className="column">{pair[0]}</div>) : (<div className="column">&nbsp;</div>) }
                  {pair[1]? (<div className="column">{pair[1]}</div>) : (<div className="column">&nbsp;</div>) }
                </div>
              );
            })}
          </div>

          <header>
            <h2 className="glossary-header">Glossary</h2>
          </header>

          <div className="help-text">
            {glossaryContent.map(pair => {
              return (
                <div className="row">
                  {pair[0]? (<div className="column">{pair[0]}</div>) : (<div className="column">&nbsp;</div>) }
                  {pair[1]? (<div className="column">{pair[1]}</div>) : (<div className="column">&nbsp;</div>) }
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
);
