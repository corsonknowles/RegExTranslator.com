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

      this.state = {
        exampleText: '',
        currentTransferFunction: 'match',
        replaceText: ', '
      };

      this.handleExampleInputChange = this.handleExampleInputChange.bind(this);
      this.handleReplaceInputChange = this.handleReplaceInputChange.bind(this);
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

      // Set results box content
      this.resultsBox.innerHTML = this[this.state.currentTransferFunction]({
        regex,
        matches,
        matchIndices
      });
    }

    handleExampleInputChange(event) {
      this.setState({ exampleText: event.target.value });
    }

    handleReplaceInputChange(event) {
      this.setState({ replaceText: event.target.value });
    }

    match(options) {
      const matchIndices = options.matchIndices;

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

    split(options) {
      const regex = options.regex;

      let resultsMarkup = '[<br/>&nbsp;&nbsp;';
      resultsMarkup += this.state.exampleText.split(regex).join(
        ',<br/>&nbsp;&nbsp;'
      );
      resultsMarkup += '<br/>]';

      return resultsMarkup;
    }

    replace(options) {
      const regex = options.regex;

      return this.state.exampleText.replace(regex, this.state.replaceText);
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
      );
    }
  }
);
