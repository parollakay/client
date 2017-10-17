import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { register } from '../actions';
import { reduxForm, Field } from 'redux-form';


class RegisterForm extends Component {
  
  handleSignup({ username, password, confirmPassword, email}) {
    this.props.register(username, password, confirmPassword, email);
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
      <form onSubmit={handleSubmit(this.handleSignup.bind(this))} >
        <div className="form-group">
          <Field component="input" type="text" placeholder="Choose a username" className="form-control" name="username" />
        </div>
        <div className="form-group">
          <Field component="input" type="password" placeholder="password" className="form-control" name="password" />
        </div>
        <div className="form-group">
          <Field component="input" type="password" placeholder="verify password" className="form-control" name="confirmPassword" />
        </div>
        <div className="form-group">
          <Field component="input" type="email" placeholder="email" className="form-control" name="email" />
        </div>
        <button action="submit" className="btn btn-primary pull-right">
          Sign Up
        </button>
        <div className="clearfix"></div>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({register}, dispatch);
  const allActionProps = { ...boundActionCreators, dispatch };
  return allActionProps;
}

RegisterForm = connect(mapStateToProps, mapDispatch)(RegisterForm);

export default reduxForm({
  form: 'register',
  fields: ['username', 'password', 'confirmPassword', 'email'],
})(RegisterForm);