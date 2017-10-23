import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import AccountHeader from './Top';
import ChangePassword from './ChangePassword';
import './user.css';
import { logout, updateUser, showSnack } from '../../actions';
import PageShell from '../../PageShell';
import { checkPassword, server } from '../../utils';
import axios from 'axios';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordOpen: false,
      passwordErr: null
    }
  }

  dismissPassErr = () => this.setState({ passwordErr: null });
  changePassword = (e) => {
    e.preventDefault();
    const current = e.target.currentPw.value;
    const password = e.target.password.value;
    const confirm = e.target.confirmPass.value;
    const data = { current, password };
    const token = localStorage.getItem('x-access-token');

    if (!this.props.authenticated) return this.setState({ passwordErr: 'You must be logged in to change your password'});

    checkPassword(password, confirm).then(() => {
      axios.post(`${server}/users/${this.props.user._id}/changePassword?token=${token}`, data).then(res => {
        this.props.updateUser(res.data);
        this.props.showSnack('Password updated.');
        this.setState({ passwordOpen: false });
      }, e => e.response ? this.setState({ passwordErr: e.response.data.message}) : this.setState({ passwordErr: `Server error processing your new password. Please try again later.`}));
    }, e => this.setState({ passwordErr: e }));
    
    e.target.currentPw.value = '';
    e.target.password.value = '';
    e.target.confirmPass.value = '';
  }

  clickLogout = () => {
    this.props.logout();
    this.props.history.push('/');
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
    console.log(user);
    return (
      <div>
        {this.renderLogin()}
        {this.props.authenticated && 
          <div className="userAccountPage">
            {!this.state.passwordOpen && <AccountHeader user={user} showPw={this.showpwForm} hidePw={this.hidepwForm} logout={this.clickLogout}/>}
            {this.state.passwordOpen && <ChangePassword hidePw={this.hidepwForm} action={this.changePassword} error={this.state.passwordErr} cancelErr={this.dismissPassErr} />}
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
  const boundActionCreators = bindActionCreators({ logout, updateUser, showSnack }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}

export default connect(mapStateToProps, mapDispatch)(Account);