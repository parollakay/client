import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from '../../utils';
import {} from '../../actions';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        this is the Users page

        <table>
        </table>
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

export default connect(mapStateToProps, mapDispatch)(Users);