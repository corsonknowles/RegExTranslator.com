import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="adam">
          <div className="bio">
            Adam
            <div className="footer-icons">
              <a className="github-icon" href="https://github.com/AdamJacobson">
                <i className="fa fa-github fa-2x" aria-hidden="true"></i>
              </a>
              <a className="linkedin-icon" href="https://www.linkedin.com/in/adam-jacobson/">
                <i className="fa fa-linkedin fa-2x" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="andy">
          <div className="bio">
            Andy
            <div className="footer-icons">
              <a className="github-icon" href="https://github.com/BoothAndrewD">
                <i className="fa fa-github fa-2x" aria-hidden="true"></i>
              </a>
              <a className="linkedin-icon" href="https://www.linkedin.com/in/boothandrewd/">
                <i className="fa fa-linkedin fa-2x" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="david">
          <div className="bio">
            David
            <div className="footer-icons">
              <a className="github-icon" href="https://github.com/corsonknowles/">
                <i className="fa fa-github fa-2x" aria-hidden="true"></i>
              </a>
              <a className="linkedin-icon" href="https://www.linkedin.com/in/davidcorsonknowles/">
                <i className="fa fa-linkedin fa-2x" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="rod">
          <div className="bio">
            Rod
            <div className="footer-icons">
              <a className="github-icon" href="https://github.com/RodShokrian">
                <i className="fa fa-github fa-2x" aria-hidden="true"></i>
              </a>
              <a className="linkedin-icon" href="https://www.linkedin.com/in/rodshokrian/">
                <i className="fa fa-linkedin fa-2x" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
