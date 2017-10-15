import React, { Component } from 'react';

import { server } from './'
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signin } from '../actions';

class SigninForm extends Component {
  handleFormSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    server.post(`/users/auth`, { username, password}).then(res => {
      this.props.signin(res.data);
    }, err => {
      console.log(err);
    })

    //this.props.signin(username, password);
  }

  renderAlert = () => {
    if(this.props.user.error) return null;
    return (
      <h3>{this.props.user.error}</h3>
    )
  }

  render() {
    return (
      <form onSubmit={e => this.handleFormSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="username" name="username" className="form-control" />
        </div>
        <div className="form-group">
          <input type="password" placeholder="password" name="password" className="form-control" />
        </div>
        <p className="text-right"><Link to="/">reset password</Link></p>
        <button action="submit" className="btn btn-primary pull-right">
          Log In
        </button>
        <div className="clearfix"></div>
        {this.renderAlert()}
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({ signin }, dispatch);
  const allActionProps = { ...boundActionCreators, dispatch};
  return allActionProps;
}

export default connect(mapStateToProps, mapDispatch)(SigninForm);
