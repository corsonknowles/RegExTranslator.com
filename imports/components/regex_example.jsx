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

      const matches = {};
      const regex = new RegExp(regexText, 'g');
      let match, counter = 1;
      while ((match = regex.exec(exampleText)) !== null) {
        if (counter >= 1000) break;   // To avoid infinite match loops
        matches[match.index] = match;
        counter++;
      }

      // TODO: Improve highlighting markup generation algorithm
      let resultsText = '';
      for (let idx = 0; idx < exampleText.length; idx++) {
        if (matches[idx]) {
          resultsText += `<span>${matches[idx][0]}</span>`;
          idx += matches[idx][0].length - 1;
        } else {
          resultsText += exampleText[idx];
        }
      }

      this.resultsBox.innerHTML = resultsText;
    }

    handleExampleInputChange(event) {
      this.setState({
        exampleText: event.target.value,
      });
    }

    render() {
      return (
        <div className="regex-example">
          <textarea
            onChange={this.handleExampleInputChange}
            value={this.state.exampleText}
          />

          |
          <br/>
          v

          <div
            ref={el => { this.resultsBox = el; }}
          />
        </div>
      );
    }
  }
);
