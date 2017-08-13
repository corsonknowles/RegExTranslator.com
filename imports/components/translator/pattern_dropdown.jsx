import React from 'react';
import { Accounts } from 'meteor/accounts-base';

class PatternDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, dummy: true };
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

    //Update regexs in props if user logs in or out
    //N.B. Ignore linter errors for Accounts
    Accounts.onLogin( () => {
      this.props.getRegexs();
      }
    );
    Accounts.onLogout( () => {
        this.props.getRegexs();
        this.setState({ dummy: !this.state.dummy });
      }
    );

    const publicPatterns = Object.keys(this.props.regexs).map((id) => {
      if (!(this.props.regexs[id].hasOwnProperty("userId"))) return (
        <button className="dropdown-item" key={id}
          onClick={() => this.props.regexSelector(this.props.regexs[id].pattern)}>
            {this.props.regexs[id].name}
        </button>
        );
      }
    );

    const privatePatterns = Object.keys(this.props.regexs).map((id) => {
      if (this.props.regexs[id].hasOwnProperty("userId")) return (
        <button className="dropdown-item" key={id}
          onClick={() => this.props.regexSelector(this.props.regexs[id].pattern)}>
            {this.props.regexs[id].name}
        </button>
        );
      }
    );

    return (
      <div className={"dropdown-container" + (this.props.swapped ? " swapped" : "")}>
        <h2 onClick={this.handleClick}>Regex Patterns ▼</h2>
        <div className={"dropdown-display" +
          (this.state.visible ? " clicked" : "")}>
          <div className="dropdown-list">
            <div className="dropdown-header">Prebuilt Patterns</div>
              {publicPatterns}
            <div className="dropdown-header">Custom Patterns</div>
              {privatePatterns}
          </div>
        </div>
      </div>
    );
  }
}

export default PatternDropdown;
