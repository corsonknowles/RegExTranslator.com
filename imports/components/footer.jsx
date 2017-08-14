import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="adam">
          <div className="bio">
            Adam Jacobson
            <span className="bio-text">
              Adam has been programming for a decade and has worked as both
              Software Developer and Quality Engineer at companies large and small.
            </span>
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
            Andrew Booth
            <span className="bio-text">
              Andrew taught himself to program on a TI-83,
              selling his programs to his high school peers for $5
              a pop. Now, he is
              well-versed in Rails, Node, JavaScript, React, and Redux.
            </span>
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
            David Corson-Knowles
            <span className="bio-text">
              Dave is passionate about the usefulness of Regex, which is why we are all here today.
               He loves Ruby, and he also loves React even though it is not Ruby.
            </span>
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
            Rod Shokrian
            <span className="bio-text">
              Rod is a full stack web developer working out of San Francisco.
              He has experience in React, Rails, Meteor, Nodejs, and MongoDB.
              When not coding, he enjoys jogging with his dog, Canelo.
            </span>
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
