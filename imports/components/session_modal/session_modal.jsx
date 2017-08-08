import React from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import Modal from 'react-modal';
import { withRouter, Link, NavLink } from 'react-router-dom';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
		width                 : '52%',
		maxWidth              : '500px',
    minWidth              : '470px',
		maxHeight             : '455px',
    minHeight             : '425px',
		height                : '52%',
		display               : 'flex',
		justifyContent        : 'center',
		alignItems            : 'center',
		color                 : '#49505b',
		fontWeight            :	'bold',
		pointerEvents         : 'auto',
		borderRadius          : '10px'
  }
};

class SessionForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			modalIsOpen: false,
      pending: false
		};

		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

    // this.clearErrors = this.props.clearErrors.bind(this);
	}


	openModal() {
	this.setState({modalIsOpen: true});
	}

	afterOpenModal() {
		// references are now sync'd and can be accessed.
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}


	render() {

	return (
			<header>
        <nav className="nav-left">
          <Link to="/">
          <img src='http://res.cloudinary.com/cloudfunded/image/upload/c_scale,h_49/v1502130863/Logomakr_7ZxwIP_go6w8y.png' />
          </Link>
        </nav>

        <nav className="nav-right">
          <div className="nav-buttons">
            <button className="register-button" onClick={this.openModal}>Create Custom Account</button>
  					<button className="login-button" onClick={this.openModal}>Log In</button>
          </div>
        </nav>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Login Form"
        >

          <button className="close-modal" onClick={this.closeModal}>X</button>

        </Modal>
			</header>

		);
	}
}

export default SessionForm;
