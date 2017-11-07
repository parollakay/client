import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AccountHeader from './Top';
import ChangePassword from './ChangePassword';
import AccountData from './AccountData';
import './user.css';
import { logout, updateUser, showSnack, getpopulatedUser, addAchievements, openDialog } from '../../actions';
import { checkPassword, server } from '../../utils';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordOpen: false,
      passwordErr: null,
      slideIndex: 0,
    }
  }

  showNotificationSettings = () => this.setState({ showNotifSettings: true });
  hideNotificationSettings = () => this.setState({ showNotifSettings: false });
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
        <a onClick={this.props.openDialog} className="btn btn-primary">Log In/Sign Up</a>
      </div>
    )
  }
  
  makeAdmin = () => {
    axios.post(`${server}/users/${this.props.user._id}/makeSuper?token=${localStorage.getItem('x-access-token')}`).then(res => {
      this.props.updateUser(res.data);
      this.props.showSnack('User Account role has been updated.');
    }, e => this.props.showSnack('ERROR! try again or check backend logs!'));
  }

  componentDidMount() {
    document.title = "My Account";
    this.props.addAchievements();
  }
  render() {
    const { user } = this.props;
    return (
      <div>
        {this.renderLogin()}
        {this.props.authenticated && 
          <div className="userAccountPage">
            {!this.state.passwordOpen && 
              <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnterTimeout={400}
                transitionLeaveTimeout={150}
                transitionName={this.state.passwordOpen ? 'SlideOut' : 'SlideIn'} >
                <AccountHeader
                  makeAdmin={this.makeAdmin}
                  user={user} 
                  showNotificationSettings={this.showNotificationSettings} 
                  showPw={this.showpwForm} 
                  hidePw={this.hidepwForm} 
                  logout={this.clickLogout}/>
              </ReactCSSTransitionGroup>
            }
            {this.state.passwordOpen && 
              <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={400}
                transitionEnterTimeout={400}
                transitionLeaveTimeout={150}
                transitionName={!this.state.passwordOpen ? 'SlideOut' : 'SlideIn'} >
                <ChangePassword hidePw={this.hidepwForm} action={this.changePassword} error={this.state.passwordErr} cancelErr={this.dismissPassErr} />
              </ReactCSSTransitionGroup>
            }
            {!this.state.passwordOpen && <hr style={{borderTopColor: 'rgba(0,0,0,.1)'}} />}
            <AccountData terms={user.terms} achievements={this.props.siteAchievements} myAchievements={user.achievements}/>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data,
    siteAchievements: state.user.siteAchievements,
    authenticated: state.user.authenticated
  }
}

const mapDispatch = dispatch => {
  const boundActionCreators = bindActionCreators({ logout, updateUser, showSnack, getpopulatedUser, addAchievements, openDialog }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}

export default connect(mapStateToProps, mapDispatch)(Account);