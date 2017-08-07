import React from 'react';
import ReactDOM from 'react-dom';
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
			email: "",
			password: "",
			username: "",
			modalIsOpen: false,
      pending: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

    this.clearErrors = this.props.clearErrors.bind(this);
	}

  componentWillUnmount() {
    this.props.clearErrors()
  };

// check applicability of this to user login flow
  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/')
    }
  }

	handleChange(event) {
		const target = event.target;
		const name = target.name;
		this.setState({
			[name]: event.target.value
		});
	}

	handleSubmit(event, type, user){
		return () => {
			if (user === undefined) {
        user = this.state;
        user.username = "";
      }
			this.props.processForm(user, type);
		};
	}

	renderErrors(){
		return(
      <div>
  			<ul className="errors">
  				{this.props.errors.map( (error, i) => (
  					<li key={`error-${i}`}>
  						{error}
  					</li>
  				))}
  			</ul>
      </div>
		);
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

          <div className="form login">
            { this.renderErrors() }
            <h2>Register or Log In</h2>

            <div className="login-box">
              <label htmlFor="email" className="login-label">EMAIL ADDRESS</label>

              <input type="text" name="email" id="email"
                value={this.state.email}
                onChange={(event) => this.handleChange(event)}
                className="login-input"
                placeholder="recruiters@regextranslator.com"
              />

              <label htmlFor="password" className="login-label">PASSWORD</label>

              <input type="password" name="password" id="password"
                value={this.state.password}
                onChange={(event) => this.handleChange(event)}
                className="login-input"
                placeholder="6 characters or more"
              />

            </div>

            <div>
              <button className="white" onClick={this.handleSubmit(event, 'signup')}>
                Register
              </button>

              <button onClick={this.handleSubmit(event, 'login')}>
                Log In
              </button>
            </div>

          </div>

          <button className="close-modal" onClick={this.closeModal}>X</button>

        </Modal>
			</header>

		);
	}
}

export default SessionForm;
