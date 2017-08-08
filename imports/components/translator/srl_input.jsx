import React from 'react';
import { connect } from 'react-redux';
import Srl from 'srl';
import {
  receiveSrl,
  receiveSrlErrors,
  clearSrlInputErrors
} from '../../actions/srl_actions';
import { receiveRegex } from '../../actions/regex_actions';

const mapStateToProps = ({ srl: { srlText } }) => ({
  srlText
});

const mapDispatchToProps = dispatch => ({
  receiveSrl: input => dispatch(receiveSrl(input)),
  receiveSrlErrors: errors => dispatch(receiveSrlErrors(errors)),
  clearSrlInputErrors: () => dispatch(clearSrlInputErrors()),
  setRegex: regexText => dispatch(receiveRegex(regexText))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        srlInputText: this.props.srlText
      };

      this.srlInputHandler = this.srlInputHandler.bind(this);
    }

    componentWillReceiveProps(nextProps, nextState) {
      this.setState({ srlInputText: nextProps.srlText });
    }

    srlInputHandler(event) {
      // Set SRL slice
      this.props.receiveSrl(event.target.value);

      try {
        // NOTE: Error causing line
        const regexText = new Srl(event.target.value).getRawRegex();

        // Set regex to SRL-translated version and clear errors
        this.props.setRegex(regexText);
        this.props.clearSrlInputErrors();
        this.srlInputBox.style.border = null;
      } catch(error) {
        // If SRL parsing fails, set errors
        this.props.receiveSrlErrors(['Invalid SRL syntax', error]);
        this.srlInputBox.style.border = '1px solid Red';
      }
    }

    render() {
      return (
        <div className="translator-input-section">
          <h2>Simple Regex Language</h2>
          <textarea
            ref={el => { this.srlInputBox = el; }}
            onChange={this.srlInputHandler}
            value={this.state.srlInputText}
          />
        </div>
      );
    }
  }
);
