import React from 'react';
import { connect } from 'react-redux';
import SRL from 'srl';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        srl_input: '',
        srl_output: ''
      };

      this.srlInputHandler = this.srlInputHandler.bind(this);
    }

    srlInputHandler(e) {
      e.preventDefault();

      this.setState({
        srl_input: e.target.value,
        srl_output: new SRL(e.target.value).get().toString()
      });
    }

    render() {
      return (
        <div className='srl-input'>
          <textarea
            onChange={this.srlInputHandler}
            value={this.state.srl_input}
          />
          <textarea value={this.state.srl_output} readOnly />
        </div>
      );
    }
  }
);
