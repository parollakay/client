import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import SigninForm from './SigninForm';
import { closeDialog } from '../actions';
import { bindActionCreators } from 'redux';



class AuthDialog extends Component {
  render() {
    return (
      <Dialog
        modal={false}
        open={this.props.auth.open}
        onRequestClose={this.props.closeDialog} >
        <div className="row">
          <div className="col-md-6">
            <div className="col-md-10 col-md-offset-1">
              <h4 className="title">Create A New Account</h4>
              <RegisterForm />
            </div>
          </div>
          <div className="authCenter hidden-sm hidden-xs"></div>
          <div className="col-md-6">
            <div className="col-md-10 col-md-offset-1">
              <h4 className="title">Log In</h4>
              <SigninForm />
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
        <br /><br />
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <small>
              By signing up, you agree to our <Link to="/">Terms</Link> and that you have read our <Link to="/">Privacy Policy</Link> and <Link to="/">Content Policy</Link>.
            </small>
          </div>
        </div>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({ closeDialog }, dispatch);
  const allActionProps = { ...boundActionCreators, dispatch};
  return allActionProps;
}

export default connect(mapStateToProps, mapDispatch)(AuthDialog);