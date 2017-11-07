import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../../utils';
import {} from '../../actions';

class Term extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        this is the Term page
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.user.authenticated
  }
}

const mapDispatch = dispatch => {
  const boundActionCreators = bindActionCreators({}, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}

export default connect(mapStateToProps, mapDispatch)(Term);