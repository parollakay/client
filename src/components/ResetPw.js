import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { getToken } from '../actions';

class ResetPw extends Component {

  submitReset({ email }) {
    this.props.getToken(email, this.props.history);
  }

  renderAlert = () => {
    if(!this.props.error) return null;
    return (
      <div className="alert alert-danger alert-dismissible" role="danger">
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;&nbsp;
        <span className="sr-only">Error:</span>
        {this.props.error}
      </div>
    )
  } 

  render() {
    const { handleSubmit } = this.props;
    console.log(this.props, this.props.history);
    return (
      <div className="col-md-8 col-md-offset-2">
        <h3 className="title">Reset Your Password</h3>
        <p className="text-muted">enter your email below and we will email you a link to reset your password.</p>
        {this.renderAlert()}
        <form onSubmit={handleSubmit(this.submitReset.bind(this))}>
          <div className="form-group">
            <label>Email:</label>
            <Field component="input" className="form-control" name="email" placeholder="Email Address..." />
          </div>
          <button action="submit" className="btn btn-primary">
            Email me
          </button>
        </form>
      </div>
    )
    
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({ getToken }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}

ResetPw = connect(mapStateToProps, mapDispatch)(ResetPw);

export default reduxForm({
  form: 'resetPw',
  fields: ['email'],
})(ResetPw);