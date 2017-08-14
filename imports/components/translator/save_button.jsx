import React from 'react';
import { Meteor } from 'meteor/meteor';

class SaveButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.state = { visible: false,
                   name: "Name this Pattern"
                 };
  }

  //Save a pattern from the regex input text in the DB. Associate
  //the pattern with the current user.
  //Language is set to Javascript by default (for now)
  handleSubmit() {
    this.props.createRegex({
                            name: this.state.name,
                            pattern: this.props.pattern,
                            language: this.props.language,
                            userId: Meteor.userId()
    }).then(this.props.getRegexs());
  }

  handleClick() {
    this.state.visible === true ? this.hide() : this.show();
  }

  handleInput(e) {
    this.setState({ name: e.target.value });
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  render() {

    return (
      <div className="save-bar">
        <i className="fa fa-star-o fa-lg" onClick={this.handleClick}></i>
        <span className={"save-input" + (this.state.visible ? " clicked" : "")}>
          <input type="text" placeholder="Name this pattern" className="name-input" onChange={this.handleInput}></input>
          <button className="save-regex" onClick={this.handleSubmit}>Save It!</button>

          <span>
            {
              ['g', 'i', 'm'].map(flag => (
                <button>{flag}</button>
              ))
            }
          </span>
        </span>
      </div>
    );
  }
}

export default SaveButton;
