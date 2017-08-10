import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // Just render a placeholder container that will be filled in
    return (
			<header>
        <nav className="nav-left">
          <a href="/">
            <img className="logo" src='https://res.cloudinary.com/cloudfunded/image/upload/c_scale,h_49/v1502130863/Logomakr_7ZxwIP_go6w8y.png' />
            <h1>RegexTranslator.com</h1>
          </a>
          <div className="login-container">
            <button className="login-button">
              <div ref="container" />
            </button>
          </div>
        </nav>
      </header>
    );
  }
}
