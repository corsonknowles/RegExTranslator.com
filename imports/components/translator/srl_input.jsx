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

      const srl = new SRL('literally "words"');
      console.log(srl);
    }

    render() {
      return (
        <div className='srl-input'>
          <textarea/>
          <textarea/>
        </div>
      );
    }
  }
);
