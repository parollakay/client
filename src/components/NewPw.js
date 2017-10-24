import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { resetPass } from '../actions';

class NewPw extends Component {

  submitChange({ password, confirmPassword }) {
    const { token } = this.props.match.params;
    this.props.resetPass(token, password, confirmPassword, this.props.history);
  }

  renderAlert = () => {
    if(!this.props.error) return null;
    return (
      <div className="alert alert-danger">
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;&nbsp;
        <span className="sr-only">Error:</span>
        {this.props.error}
      </div>
    )
  } 

  componentDidMount() {
    window.title = "Change Password - Parol Lakay";
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="col-md-8 col-md-offset-2">
        <h3 className="title">Change Your Password</h3>
        <p className="text-muted">Enter a new password below.</p>
        {this.renderAlert()}
        <div className="row">
          <div className="col-md-10">
            <form onSubmit={handleSubmit(this.submitChange.bind(this))} >
              <div className="form-group">
                <label>New Password:</label>
                <Field component="input" type="password" className="form-control" name="password" placeholder="Password" />
              </div>

              <div className="form-group">
                <label>Confirm Password:</label>
                <Field component="input" type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" />
              </div>

              <button action="submit" className="btn btn-primary">
                Change Password
              </button>
            </form>
          </div>
        </div>
        
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
  const boundActionCreators = bindActionCreators({ resetPass }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}

NewPw = connect(mapStateToProps, mapDispatch)(NewPw);

export default reduxForm({
  form: 'NewPw',
  fields: ['email'],
})(NewPw);