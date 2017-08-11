import React from 'react';
import { connect } from 'react-redux';
import {
  receiveRegex,
  getRegexs,
  createRegex
} from '../../actions/regex_actions';
import PatternDropdown from './pattern_dropdown';

const mapStateToProps = (state) => ({
  regexText: state.regex.regexText,
  regexs: state.regexs,
  errors: state.regex.errors
});

const mapDispatchToProps = dispatch => ({
  receiveRegex: input => dispatch(receiveRegex(input)),
  getRegexs: () => dispatch(getRegexs()),
  createRegex: (data) => dispatch(createRegex(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        regexInputText: this.props.regexText
      };

      this.regexInputHandler = this.regexInputHandler.bind(this);
      this.regexSelector = this.regexSelector.bind(this);
    }

    componentDidMount() {
      this.props.getRegexs();
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ regexInputText: nextProps.regexText });
    }

    regexInputHandler(event) {
      this.props.receiveRegex(event.target.value);
      // TODO: Run reverse translation here
    }

    regexSelector(pattern) {
      this.setState({ regexInputText: pattern });
    }

    render() {
      //Initialize a variable to hold our PatternDropdown component (if
      // we've received our regexs)
      let DropdownComponent;
      if (Object.keys(this.props.regexs).length > 0) {
        DropdownComponent = (
          <PatternDropdown
            regexs={this.props.regexs}
            regexSelector={this.regexSelector}
          />
        );
      } else {
        DropdownComponent = <div />;
      }

      let swapButton = <div />;
      let klasses = ['regex-input-container'];
      if (this.props.idx === 0) {
        swapButton = <button onClick={() => this.props.swap()}>Swap</button>;
        klasses.push('editable');
      }

      if (this.props.errors.length > 0) {
        klasses.push('error');
      }

      return (
        <div className="translator-input-section">
          <header>
            <h2>Regular Expression</h2>
            {swapButton}
          </header>

          <div>
            <textarea
              onChange={this.regexInputHandler}
              value={this.state.regexInputText}
              disabled={this.props.idx !== 0}
              autoFocus={this.props.idx === 0}
              className={klasses.join(' ')}
            />
            <footer className={klasses.join(' ')}>
              <img src="img/outline-star.png" />
              <img src="img/yellow-star.png" />
            </footer>
          </div>
        </div>
      );
    }
  }
);
