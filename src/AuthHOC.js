import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const AuthHOC = Page => {
  if (!this.props.authenticated) return <Redirect to="/" />
  return props => {
    <Page { ...props} />
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.user.authenticated
  }
}

export default connect(mapStateToProps)(AuthHOC);
