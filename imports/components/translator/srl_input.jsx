import React from 'react';
import { connect } from 'react-redux';
import { receiveSrlInput } from '../../actions/actions';

const mapStateToProps = ({ srlInput: { srlInputText } }) => ({
  srlInputText
});

const mapDispatchToProps = dispatch => ({
  receiveSrlInput: input => dispatch(receiveSrlInput(input))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        srlInputText: this.props.srlInputText
      };

      this.srlInputHandler = this.srlInputHandler.bind(this);
    }

    srlInputHandler(e) {
      e.preventDefault();

      this.props.receiveSrlInput(e.target.value);
    }

    componentWillReceiveProps(nextProps, nextState) {
      this.setState({ srlInputText: nextProps.srlInputText });
    }

    render() {
      return (
        <div className="srl-input">
          <textarea
            onChange={this.srlInputHandler}
            value={this.state.srlInputText}
          />
        </div>
      );
    }
  }
);
