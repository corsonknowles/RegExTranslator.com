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
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
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
      console.log(part);
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
            options={this.state.options}
            className={classes.join(' ')}
            />

          <header>
            <h2 className="help-header">Help Text</h2>
          </header>

          <div className="help-text">
            (a) capture (a)<br />

            (?abc) literally abc<br />

            [abc] one of "abc"<br />

            [^abc] raw [^abc]<br />

            [a-z] letter<br />

            [A-Z] uppercase letter<br />

            "plain text string" -> literally "plain text string"<br />

            ^ starts with<br />

            ? optional<br />

            $ must end<br />

            . anything<br />

            + once or more<br />

            * never or more<br />

            &#123;8,&#125; at least 8 times<br />

            &#123;5&#125; exactly 5 times<br />

            &#123;7-9&#125; between 7 and 9 times<br />

            &#123;1&#125; once<br />

            &#123;2&#125; twice<br />

            Lookaheads:<br />
            (?:a)(?=(?:9)) literally a if followed by 9<br />

            ((?:b))(?!(?:8)) capture b if not followed by 8<br />

            Character classes:<br />
            \d digit<br />

            \w any character<br />

            \W no character<br />

            \s whitespace<br />

            \S no whitespace<br />

            \t tab<br />

            \n new line<br />

            \ use a backslash for characters that usually have special handling.
             You can escape that character and it will be treated literally. For
              example \d will match a digit, while \\d will match a string that
              has a backslash followed by the letter d.<br />
            <br />
            Flags:<br />
            /yourRegex/m multi line<br />

            /myRegex/i case insensitive<br />
            <br />
            Coming soon:<br />\r carriage return  \v vertical tab  \D no digit
            [^abc] none of "abc" \b word \B no word<br />
            <br />
            Currently unsupported characters: <br />\1 referencing a capturing
            group [\b] backspace \0 NUL \cX ctrl-X \uDDDD for a given unicode
            character \f form feed<br />
            <br />
          </div>

          <header>
            <h2 className="glossary-header">Glossary</h2>
          </header>

          <div className="help-text">

            Glossary:<br />
            any character \w<br />
            any of (a, b, c) (a|b|c)<br />
            anything .<br />
            at least 8 times &#123;8,&#125;<br />
            backslash \<br />
            between 3 and 7 times &#123;3,7&#125;<br />
            capture a (a)<br />
            case insensitive /myRegex/i<br />
            digit \d<br />
            digit from 3 to 5 [3-5]<br />
            either of (x, y, z) (x|y|z)<br />
            exactly 3 &#123;3&#125;<br />
            exactly 4 times &#123;4&#125;<br />
            if followed by -> capture (digit) if followed by (any character) ->
            /([0-9])(?=\w)/<br />
            if not followed by -> capture (letter) if not followed by (digit)
            /([a-z])(?![0-9])/<br />
            letter [a-z]<br />
            letter from g to m [g-m]<br />
            literally "a string to match" -> (?:a string to match)<br />
            multi line /yourRegex/m<br />
            must end $<br />
            never or more *<br />
            new line \n<br />
            no character \W<br />
            no whitespace \S<br />
            number from -> number from 4 to 6 -> [4-6]<br />
            once &#123;1&#125;<br />
            one of "defg1234" [defg1234]<br />
            optional ?<br />
            once or more +<br />
            raw "[a-zA-Z]" -> [a-zA-Z]<br />
            starts with ^<br />
            tab \t<br />
            twice &#123;2&#125;<br />
            until -> capture (anything once or more) until "." -> (.+?)(?:\.)<br />
            uppercase letter [A-Z]<br />
            uppercase letter from M to P [M-P]<br />
            whitespace \s<br />

            Coming soon: backslash, none of<br />
            <br />

          </div>
        </div>
      );
    }
  }
);
