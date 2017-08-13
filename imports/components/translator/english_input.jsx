import React from 'react';
import { connect } from 'react-redux';
import Srl from 'srl';
import { receiveSrl } from '../../actions/srl_actions';
import {
  receiveRegex,
  receiveRegexFlags
} from '../../actions/regex_actions';
import { engToSrl } from './english_translator';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setSrl: srlText => dispatch(receiveSrl(srlText)),
  setRegex: regexText => dispatch(receiveRegex(regexText)),
  setRegexFlags: flags => dispatch(receiveRegexFlags(flags))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        englishInputText: ''
      };

      this.englishInputHandler = this.englishInputHandler.bind(this);
    }

    englishInputHandler(event) {
      this.setState({ englishInputText: event.target.value });

      const srlText = engToSrl(event.target.value);
      try {
        const srl = new Srl(srlText);
        const regexText = srl.getRawRegex();
        const regex = new RegExp(regexText);

        this.props.setSrl(engToSrl(event.target.value));
        this.props.setRegex(regexText);
      } catch(error) {}
    }

    render() {
      return (
        <div className="translator-input-section">
          <header>
            <h2>English (kindof)</h2>
          </header>

          <textarea
            onChange={this.englishInputHandler}
            value={this.state.englishInputText}
            disabled={this.props.idx !== 0}
            autoFocus={this.props.idx === 0}
          />
        </div>
      );
    }
  }
);
