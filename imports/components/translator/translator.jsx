import React from 'react';
import SrlInput from './srl_input';
import RegexInput from './regex_input';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputBoxOrder: [
        SrlInput,
        RegexInput
      ],
      swapped: false
    };

    this.swapInputBoxes = this.swapInputBoxes.bind(this);
  }

  swapInputBoxes() {
    const inputBoxOrder = this.state.inputBoxOrder.slice();
    this.setState({
                  inputBoxOrder: inputBoxOrder.reverse(),
                  swapped: !this.state.swapped
                  });
  }

  render() {
    return (
      <div className="translator">
          {
            this.state.inputBoxOrder.map((Component, idx) => (
              <Component
                key={idx}
                idx={idx}
                swap={this.swapInputBoxes}
                swapped={this.state.swapped}
              />
            ))
          }
      </div>
    );
  }
}
