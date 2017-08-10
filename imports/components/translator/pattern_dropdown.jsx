import React from 'react';

class PatternDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const RegexArray = Object.values(this.props.regexs);
    const patternItems = Object.keys(this.props.regexs).map((id) => (
      <button className="pattern-item" key={id}
        onClick={() => this.props.regexSelector(this.props.regexs[id].pattern)}>
          {this.props.regexs[id].name}
      </button>
      )
    );

    return (
      <div className="pattern-container">
          <h2>Preset Patterns</h2>
          <div className="pattern-box">
            {patternItems}
          </div>
      </div>
    );
  }
}

export default PatternDropdown;
