import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { server} from '../../utils';
import { showSnack, updateNotifications } from '../../actions';
import NotificationSettings from './NotificationSettings';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }
  tglNotification = type => {
    const token = localStorage.getItem('x-access-token');
    return new Promise((resolve, reject) => {
      axios.post(`${server}/users/${this.props.user._id}/togl_notifications/${type}?token=${token}`)
        .then(res => {
          const { notificationSettings } = res.data;
          this.props.updateNotifications(notificationSettings);
          resolve(res.data);
        }, err => {
          console.log(err);
          if (!err.response) return reject(err);
          this.setState({ error: err.response.data.message });
          reject(err);
        });
    });
  }

  tgl_notifications_likes = () => {
    this.tglNotification('likes').then(account => this.props.showSnack('Email settings updated for Likes'));
  }
  tgl_notifications_sentences = () => {
    this.tglNotification('sentences').then(account => this.props.showSnack('Email settings updated for sentences'));
  }
  tgl_notifications_achievements = () => {
    this.tglNotification('achievements').then(account => this.props.showSnack('Email settings updated for achievements'));
  }
  notificationsOff = () => {
    const token = localStorage.getItem('x-access-token');
    axios.post(`${server}/users/${this.props.user._id}/notifications_off?token=${token}`).then(res => {
      const { notificationSettings } = res.data;
      this.props.updateNotifications(notificationSettings);
      this.props.showSnack('Notification setting updated.');
    }, e => e.response ? this.setState({ error: e.response.data.message }) : this.setState({ error: `Couldn't perform this operation.`}))
  }

  renderLogin = () => {
    if (this.props.authenticated) return null;
    return (
      <div className="col-md-12">
        <h3>You need to be logged in to access the account settings</h3>
        <a onClick={this.props.openDialog} className="btn btn-primary">Log In/Sign Up</a>
      </div>
    )
  }
  componentDidMount() {

    window.title = "Account Settings - Parol Lakay";
  }
  render() {
    const { user } = this.props;
    console.log(this.props.user);
    return(
      <div className="row">
        {this.renderLogin()}
        {this.props.authenticated && 
        <div>
          <div className="col-md-6 col-md-offset-3">
            <Link to="/myAccount" className="icon-first text-muted"><i className="fa fa-arrow-left"></i>Back to Account Settings</Link>
            <p>Use the settings below to determine which notifications you receive by email.</p>
            <NotificationSettings
              tglLikes={this.tgl_notifications_likes}
              tglSentences={this.tgl_notifications_sentences}
              tglAchievements={this.tgl_notifications_achievements}
              allOff={this.notificationsOff}
              achievements={user.notificationSettings.achievements}
              likes={user.notificationSettings.likes}
              sentences={user.notificationSettings.sentences} />
          </div>
          <div className="clearfix"></div>
          <br /><br />
          <div className="col-md-12">
            <p className="text-muted text-center">
              You will still receive confirmation emails when you add a new definition, change your password, etc...
            </p>
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
  const boundActionCreators = bindActionCreators({ showSnack, updateNotifications }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}

export default connect(mapStateToProps, mapDispatch)(Settings);