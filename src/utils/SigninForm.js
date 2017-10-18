import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signin } from '../actions';

class SigninForm extends Component {

  handleSignin({ username, password }) {
    this.props.signin(username, password);
  }

  renderAlert = () => {
    if(!this.props.error) return null;
    return (
      <small className="text-danger">{this.props.error}</small>
    )
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSignin.bind(this))}>
        <div className="form-group">
          <Field component="input" type="text" placeholder="username" name="username" className="form-control" />
        </div>
        <div className="form-group">
          <Field component="input" type="password" placeholder="password" name="password" className="form-control" />
        </div>
        <p className="text-right"><Link to="/resetPw">reset password</Link></p>
        <button action="submit" className="btn btn-primary pull-right">
          Log In
        </button>
        <div className="clearfix"></div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({ signin }, dispatch);
  const allActionProps = { ...boundActionCreators, dispatch};
  return allActionProps;
}

SigninForm = connect(mapStateToProps, mapDispatch)(SigninForm);

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password'],
})(SigninForm);
