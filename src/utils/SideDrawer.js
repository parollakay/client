import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';
import Drawer from 'material-ui/Drawer';
import moment from 'moment';
import {Tabs, Tab} from 'material-ui/Tabs';
import { closeDrawer, deleteNotification, markNotificationRead, clearAllNotifications, openDrawer, addDrawerErr, updateUser, showSnack } from '../actions';
import { titleCase, server } from './';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import axios from 'axios';


class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a'
    }
  }

  changeTabs = value => this.props.openDrawer(value);

  unsaveTerm = term => {
    axios.post(`${server}/users/${this.props.user._id}/unsaveTerm/${term}`).then(res => {
      this.props.updateUser(res.data);
      this.props.showSnack('Term removed');
    }, e => e.response ? this.props.addDrawerErr(e.response.data.message) : this.props.addDrawerErr('Server error'));
  }
  
  render() {
    console.log(this.props.savedTerms);
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
            value={this.props.tab}
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
                        <Link to={notification.url} >
                          {notification.text}
                        </Link>
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
            <Tab label="Saved" value="b" className="savedTermTabStyle">
              <div className="drawerSavedTerms">
                {this.props.savedTerms.length < 1 &&
                  <p className="text-muted text-center">You have not saved any terms.</p>
                }
                {this.props.savedTerms.length > 0 && 
                  <Scrollbars
                    autoHeight
                    autoHeightMin={window.innerHeight - 125}
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    >
                    <ul>
                      {this.props.savedTerms.sort((a,b) => new Date(b.created) - new Date(a.created)).map((saved, i) => {
                        return (
                          <li key={`savedTerm-${i}`}>
                            <Paper zDepth={1} className="singleSavedTerm">
                              <div className="stTopActions clearfix">
                                <a className="pull-left text-muted">Saved {moment(saved.created).fromNow()}</a>
                                <a className="pull-right icon-first hover" onClick={() => this.unsaveTerm(saved._id)}> <i className="fa fa-trash"></i> Un-save </a>
                              </div>
                              <Link to={`/search?term=${saved.term.text}`}>
                                <h4 className="title">{titleCase(saved.term.text)}</h4>
                              </Link>
                              <p className="drawerDefinition">{saved.term.definition}</p>
                              <ul className="drawerSavedFooter">
                                <li> {saved.term.upvotes} Likes </li>
                                <li> {saved.term.sentences.length} Sentences </li>
                              </ul>
                            </Paper>
                          </li>
                        )
                      })}
                    </ul>
                  </Scrollbars>
                }
              </div>
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
    tab: state.auth.drawerTab,
    user: state.user.data,
    notifications: state.user.data.notifications,
    authenticated: state.user.authenticated,
    savedTerms: state.user.data.savedTerms
  }
}

const mapDispatch = dispatch => {
  const boundActionCreators = bindActionCreators({ closeDrawer, deleteNotification, markNotificationRead, clearAllNotifications, openDrawer, addDrawerErr, updateUser, showSnack }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators
}

export default connect(mapStateToProps, mapDispatch)(SideDrawer);