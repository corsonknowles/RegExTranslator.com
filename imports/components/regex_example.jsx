import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ regex: { regexText } }) => ({
  regexText
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component {
    constructor(props) {
      super(props);

      let textContent = "Thank you for your interest in RegExTranslator.\nYou can edit this text to see example matches for your regular expressions below.\n\nHere are some common text types you can explore matches with:\nthe lowercase letters [a-z] group abcdefghijklmnopqrstuvwxyz\nand the capital letters [A-Z] ABCDEFGHIJKLMNOPQRSTUVWXYZ\ndigits [0-9] 0123456789\ncommon keyboard special characters [!-/] !\"#$%&\'()*+,-./\n\nCommand-Z will undo typing and command-Y will redo typing in most browsers.";

      this.state = {
        exampleText: textContent
      };

      this.handleExampleInputChange = this.handleExampleInputChange.bind(this);
    }

    componentDidUpdate() {
      const { props: { regexText }, state: { exampleText } } = this;

      // Create regex to match with
      // NOTE: Global flag set
      // TODO: Set flags with GUI
      const regex = new RegExp(regexText, 'g');

      // Create list of matches and match indices (all indices at which a
      //  character should be highlighted)
      const matches = {};   // NOTE: `matches` currently going unused
      const matchIndices = new Set;
      let match, counter = 0;
      while ((match = regex.exec(exampleText)) !== null) {
        // Avoid infinite match loops
        // TODO: Find better way to avoid infinite match cases
        // Investigate: https://stackoverflow.com/questions/33015942/regex-exec-loop-never-terminates-in-js
        if (counter >= 100) break;

        // Add matches to match pojo
        matches[match.index] = match;

        // Add all indices of characters within match to `matchIndices`
        for (let i = 0; i < match[0].length; i++) {
          matchIndices.add(match.index + i);
        }

        // Increment limit counter
        counter++;
      }

      // Wrap consecutive sets of match-indices in spans for highlighting
      let resultsMarkup = '';
      for (let idx = 0; idx < exampleText.length; idx++) {
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
        resultsMarkup += exampleText[idx];
      }

      // Set results box content
      this.resultsBox.innerHTML = resultsMarkup;
    }

    handleExampleInputChange(event) {
      this.setState({ exampleText: event.target.value });
    }

    render() {
      return (
        <div className="regex-example">
          <textarea
            onChange={this.handleExampleInputChange}
            value={this.state.exampleText}
          />

          <div className="transfer-functions">
            <img src="img/arrow-12-512.png" alt="function arrow" />
            <div>
              <button className="transfer-function-active">Match</button>
              <button>Capture</button>
              <button>Split</button>
              <button>Replace</button>
              <input type="text" value={'", "'} />
            </div>
          </div>

          <div
            className="results-box"
            ref={el => { this.resultsBox = el; }}
          />
        </div>
      );
    }
  }
);
