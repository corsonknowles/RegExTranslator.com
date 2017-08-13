import React from 'react';
import { connect } from 'react-redux';
import exampleContent from '../webcopy/example_content';

const mapStateToProps = ({ regex: { regexText, regexFlags } }) => ({
  regexText,
  regexFlags
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component {
    constructor(props) {
      super(props);

      let textContent = `Thank you for your interest in RegExTranslator.\nYou can edit this text to see example matches for your regular expressions below.\n\nHere are some common text types you can explore matches with:\nthe lowercase letters [a-z] group abcdefghijklmnopqrstuvwxyz\nand the capital letters [A-Z] ABCDEFGHIJKLMNOPQRSTUVWXYZ\ndigits [0-9] 0123456789\ncommon keyboard special characters [!-/] !\"#$%&\'()*+,-./\n\nCommand-Z will undo typing and command-Y will redo typing in most browsers.\n\nGuide to Special Characters in RegEx: . matches any single character, except line terminators \\n (newline) \\r (carriage return) \\u2028 (unicode line separator) \\u2029 (unicode paragraph separator) \n\n \\d matches any digit. [0-9] works identically.\n\n \\w matches any alphanumeric character, including underscores. Works the same as [A-Za-z0-9_] \n\n \\W  matches any character that is not a word character. Same as [^A-Za-z0-9_] \n\n \\s matches a single whitespace character. \n\n \\S matches a single character other than whitespace. \n\n \\t matches a horizontal tab character \n\n \\r matches a carriage return. \n\n \\n matches a new line or linefeed. \n\n \\ a backslash is for characters that usually have special handling, you can escape that character and it will be treated literally. For example \\d would match a digit, while \\\\d will match a string that has a backslash followed by the letter d. \n\n x|y the pipe is an or operator in RegEx, it will match either x or y \n\n ^ the caret means start with, it matches the beginning of input. \n\n $ is the complement of the caret and indicates the string to be matched must end. \n\n \b matches a word boundary. It is most often used to insert characters before or after words. It has no length, since it is a concept rather than a character. \n\n \B matches a non-word boundary. \n\n (x) surrounding part of your query in quotes creates a capturing group. It matches x and remembers the match. \n\n Currently unsupported characters \\1 referencing a capturing group \n\n \\v vertical tab [\\b] backspace \\0 matches NUL \\cX matches ctrl-X \\uDDDD matches a given unicode character \\f matches a form feed `;

      this.state = {
        exampleText: exampleContent,
        currentTransferFunction: 'match',
        replaceText: ', '
      };

      this.handleExampleInputChange = this.handleExampleInputChange.bind(this);
      this.handleReplaceInputChange = this.handleReplaceInputChange.bind(this);
      this.handleFunctionButtonClick =
        this.handleFunctionButtonClick.bind(this);
    }

    componentDidUpdate() {
      const {
        resultsBox,
        props: { regexText, regexFlags },
        state: { exampleText, currentTransferFunction }
      } = this;


      let regex;
      try {
        // Create regex to match with
        regex = new RegExp(regexText, regexFlags.join(''));
      } finally {
        // Set results box content
        resultsBox.innerHTML = this[currentTransferFunction](regex);
      }
    }

    handleFunctionButtonClick(event) {
      // Skip if not button
      if (event.target.tagName !== 'BUTTON') return;

      // Remove active class from all buttons
      event.currentTarget.querySelectorAll('button').forEach(button => {
        button.classList.remove('transfer-function-active');
      });

      // Add active class to clicked button and overwrite
      //  currentTransferFunction
      const targetButton = event.target;
      targetButton.classList.add('transfer-function-active');
      this.setState({
        currentTransferFunction: targetButton.innerText.toLowerCase()
      });
    }

    handleExampleInputChange(event) {
      this.setState({ exampleText: event.target.value });
    }

    handleReplaceInputChange(event) {
      this.setState({ replaceText: event.target.value });
    }

    match(regex) {
      const exampleText = this.state.exampleText;

      // Create list of matches and match indices (all indices at which a
      //  character should be highlighted)
      const matchIndices = new Set;
      let match;
      while ((match = regex.exec(exampleText))) {
        if (match.index === regex.lastIndex) regex.lastIndex++;

        // Add all indices of characters within match to `matchIndices`
        for (let i = 0; i < match[0].length; i++) {
          matchIndices.add(match.index + i);
        }
      }

      // Wrap consecutive sets of match-indices in spans for highlighting
      let resultsMarkup = '';
      for (let idx = 0; idx < this.state.exampleText.length; idx++) {
        // Open span if previous not a matching character and current is a
        //  matching character
        if (!matchIndices.has(idx - 1) && matchIndices.has(idx)) {
          resultsMarkup += '<span>';
        }

        // Close span if previous was a matching character and current is not a
        //  matching character
        if (matchIndices.has(idx - 1) && !matchIndices.has(idx)) {
          resultsMarkup += '</span>';
        }

        // Add current character
        const currentChar = this.state.exampleText[idx];
        switch (currentChar) {
          case ' ':
            resultsMarkup += '&nbsp;';
            break;

          case '\n':
            resultsMarkup += '<br/>';
            break;

          default:
            resultsMarkup += currentChar;
            break;
        }
      }

      return resultsMarkup;
    }

    capture(regex) {
      const exampleText = this.state.exampleText;

      // Print list of captures
      // TODO: Not sure if this is actually right. How do I obtain capture
      //  groups?
      let resultsMarkup = '';
      resultsMarkup += '[<br/>&nbsp;&nbsp;';
      resultsMarkup += exampleText.match(regex).join(',<br/>&nbsp;&nbsp;');
      resultsMarkup += '<br/>]';

      return resultsMarkup;
    }

    split(regex) {
      const exampleText = this.state.exampleText;

      // Print list of split results
      let resultsMarkup = '';
      resultsMarkup += '[<br/>&nbsp;&nbsp;';
      resultsMarkup += exampleText.split(regex).join(',<br/>&nbsp;&nbsp;');
      resultsMarkup += '<br/>]';

      return resultsMarkup;
    }

    replace(regex) {
      return this.state.exampleText.replace(regex, this.state.replaceText);
    }

    render() {
      return (
        <div className="regex-example-container">
          <div className="regex-example">
            <textarea
              onChange={this.handleExampleInputChange}
              value={this.state.exampleText}
            />

            <div className="transfer-functions">
              <img src="img/arrow-12-512.png" alt="function arrow" />
              <div onClick={this.handleFunctionButtonClick}>
                <button className="transfer-function-active">Match</button>
                <button>Capture</button>
                <button>Split</button>
                <button>Replace</button>
                <input
                  onChange={this.handleReplaceInputChange}
                  value={this.state.replaceText} />
              </div>
            </div>

            <div
              className="results-box"
              ref={el => { this.resultsBox = el; }}
            />
          </div>
        </div>
      );
    }
  }
);
