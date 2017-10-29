import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Drawer from 'material-ui/Drawer';
import moment from 'moment';
import {Tabs, Tab} from 'material-ui/Tabs';
import { closeDrawer, deleteNotification, markNotificationRead, clearAllNotifications } from '../actions';
import {} from './';
import { Link } from 'react-router-dom';

class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a'
    }
  }

  changeTabs = value => this.setState({ value });
  
  render() {
    return (
      <Drawer 
        docked={true}
        width={250}
        open={this.props.drawerOpen}
        onRequestChange={this.props.closeDrawer}
        openSecondary={true}
      >
        <div className="drawerHeader">
          <Link to="/newTerm" className="topAddTermLink">Add Term <i className="ion-plus"></i> </Link>
          <Link to="/myAccount" className="topAddTermLink">Account<i className="ion-gear-b"></i></Link>
          <a onClick={this.props.closeDrawer} className="drawerClosebtn hover">
            &times;
          </a>
        </div>
        <div className="drawerTabs">
          <Tabs
            value={this.state.value}
            onChange={this.changeTabs}>
            
            <Tab label="Notifications" value="a">
              <div className="drawerTabLinks">
                <a className="hover icon-first" onClick={this.props.clearAllNotifications}>
                  <i className="fa fa-trash"></i>
                  Clear All
                </a>
                <Link to="/Settings" className="icon-first">
                  <i className="fa fa-gear"></i>
                  Settings
                </Link>
              </div>
              {this.props.authenticated && 
                <ul className="sideNotificationsList">
                  {this.props.notifications.length < 1 &&
                    <li>
                      <p className="text-center">You have no notifications.</p>
                    </li>
                  }
                  {this.props.notifications.map((notification, i) => {
                    return (
                      <li key={`notification-${i}`} className={notification.read ? `` : `unread`}>
                        <a href={notification.url} >
                          {notification.text}
                        </a>
                        <div className="drawerNotifOptions">
                          <a>{moment(notification.created).fromNow()}</a>
                          {!notification.read && 
                            <a className="hover" onClick={() => this.props.markNotificationRead(notification._id)}>Mark as Read</a>
                          }
                          <a className="hover" onClick={() => this.props.deleteNotification(notification._id)}>Delete</a>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              }
              
            </Tab>
            <Tab label="Saved" value="b">
              <p>All saved terms go here</p>
            </Tab>
          </Tabs>
        </div>
      </Drawer>
    )
  }
}

const mapStateToProps = state => {
  return {
    drawerOpen: state.auth.drawerOpen,
    notifications: state.user.data.notifications,
    authenticated: state.user.authenticated
  }
}

const mapDispatch = dispatch => {
  const boundActionCreators = bindActionCreators({ closeDrawer, deleteNotification, markNotificationRead, clearAllNotifications }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators
}

export default connect(mapStateToProps, mapDispatch)(SideDrawer);