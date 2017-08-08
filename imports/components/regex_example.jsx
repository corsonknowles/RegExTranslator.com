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
      };

      this.handleExampleInputChange = this.handleExampleInputChange.bind(this);
    }

    componentDidUpdate() {
      const { props: { regexText }, state: { exampleText } } = this;

      // Create regex to match with
      // NOTE: Global flag set,
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
        if (counter >= 100) break;

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

          |<br/>v

          <div ref={el => { this.resultsBox = el; }} />
        </div>
      );
    }
  }
);
