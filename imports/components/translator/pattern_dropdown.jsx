import React from 'react';

class PatternDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  handleClick() {
    this.state.visible === true ? this.hide() : this.show();
  }

  render() {
    const RegexArray = Object.values(this.props.regexs);
    const dropdownItems = Object.keys(this.props.regexs).map((id) => (
      <button className="dropdown-item" key={id}
        onClick={() => this.props.regexSelector(this.props.regexs[id].pattern)}>
          {this.props.regexs[id].name}
      </button>
      )
    );

    return (
      <div className="dropdown-container">
        <h2 onClick={this.handleClick}>Prebuilt Patterns</h2>
        <div className={"dropdown-display" +
          (this.state.visible ? " clicked" : "")}>
          <div className="dropdown-list">
            {dropdownItems}
          </div>
        </div>
      </div>
    );
  }
}

export default PatternDropdown;
