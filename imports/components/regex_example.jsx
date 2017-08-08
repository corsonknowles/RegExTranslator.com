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

      const regex = new RegExp(regexText, 'g');   // NOTE: Global flag set
      const matches = {};
      const matchIndices = new Set;
      let match, counter = 0;
      while ((match = regex.exec(exampleText)) !== null) {
        if (counter >= 100) break;   // Avoid infinite match loops

        matches[match.index] = match;

        for (let i = 0; i < match[0].length; i++) {
          matchIndices.add(match.index + i);
        }

        counter++;
      }

      let resultsText = '';
      let currentMatch;
      for (let idx = 0; idx < exampleText.length; idx++) {
        if (!matchIndices.has(idx - 1) && matchIndices.has(idx)) {
          resultsText += '<span>';
        }

        if (matchIndices.has(idx - 1) && !matchIndices.has(idx)) {
          resultsText += '</span>';
        }

        resultsText += exampleText[idx];
      }

      this.resultsBox.innerHTML = resultsText;
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
