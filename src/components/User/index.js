import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import AccountHeader from './Top';
import ChangePassword from './ChangePassword';
import './user.css';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordOpen: false
    }
  }

  showpwForm = () => {
    this.setState({
      passwordOpen: true
    })
  }

  hidepwForm = () => {
    this.setState({
      passwordOpen: false
    })
  }

  renderLogin = () => {
    if (this.props.authenticated) return null;
    return (
      <div>
        <h3>You need to be logged in to access the account settings</h3>
        <a onClick={this.props.openAuth} className="btn btn-primary">Log In/Sign Up</a>
      </div>
    )
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        {this.renderLogin()}
        {this.props.authenticated && 
          <div className="userAccountPage">
            <AccountHeader user={user} showPw={this.showpwForm} hidePw={this.hidepwForm} />
            <ChangePassword user={user} hidePw={this.hidepwForm} />
            <div className="row tabGroupBottom">
            </div>
          </div>
        }
      </div>
      
      
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
    authenticated: state.user.authenticated
  }
}

const mapDispatch = dispatch => {
  const boundActionCreators = bindActionCreators({}, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}

export default connect(mapStateToProps, mapDispatch)(Account);