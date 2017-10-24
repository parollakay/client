import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AccountHeader from './Top';
import ChangePassword from './ChangePassword';
import AccountData from './AccountData';
import './user.css';
import { logout, updateUser, showSnack } from '../../actions';
import { checkPassword, server } from '../../utils';
import axios from 'axios';


class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordOpen: false,
      passwordErr: null,
      slideIndex: 0
    }
  }

  tabChange = value => this.setState({ slideIndex: value });
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

  

 componentDidMount() {
    const token = localStorage.getItem('x-access-token');
    const userId = localStorage.getItem('x-user-id');
    axios.get(`${server}/users/${userId}/populatedUser?token=${token}`).then(res => {
      this.setState({ terms: res.data.terms, likes: res.data.upvotes });
      axios.get(`${server}/utils/achievements`).then(response => {
        for (let i = 0; i < res.data.achievements.length; i++) {
          for (let j = 0; j < response.data.length; j++) {
            if (response.data[j].min === res.data.achievements[i].min) {
              response.data.splice(j,1);
            }
          }
        }
        this.setState({ achievements: response.data })
      });
    })
  }
  render() {
    const { user } = this.props;
    return (
      <div>
        {this.renderLogin()}
        {this.props.authenticated && 
          <div className="userAccountPage">
            {!this.state.passwordOpen && <AccountHeader user={user} showPw={this.showpwForm} hidePw={this.hidepwForm} logout={this.clickLogout}/>}
            {this.state.passwordOpen && <ChangePassword hidePw={this.hidepwForm} action={this.changePassword} error={this.state.passwordErr} cancelErr={this.dismissPassErr} />}
            <AccountData terms={this.state.terms} achievements={this.state.achievements} myAchievements={this.props.user.achievements}/>
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