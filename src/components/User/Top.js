import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const AccountHeader = props => {
  const { user } = props;
  return (
    <div className="row accountTop">
      <div className="col-md-6">
        <h2>{user.username}</h2>
        <p className="atEmail">
          {user.achievements.length > 0 && <span><i className="ion-ribbon-b"></i> {user.achievements[user.achievements.length - 1].name}  · </span>}
          {user.email}
        </p>
        <small>Member since {moment(user.created).format('MMMM Do, YYYY')} </small>
        <br />
        <div className="topActions">
          <Link to="/Settings" className="icon-first hover">
            <i className="glyphicon glyphicon-envelope"></i>
            Notifications
          </Link>
          &nbsp;&nbsp;·&nbsp;&nbsp; 
          <a className="icon-first hover" onClick={props.showPw}>
            <i className="glyphicon glyphicon-lock"></i>
            Change Password
          </a>
          &nbsp;&nbsp;·&nbsp;&nbsp; 
          <a className="icon-first" onClick={props.logout}>
            <i className="glyphicon glyphicon-log-out"></i>
            Log Out
          </a>
        </div>
        
      </div>
      <div className="col-md-6">
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4 actTopRightContainer">
            <span>{user.achievements.length}</span>
            <span>Achievements unlocked</span>
          </div>
          <div className="col-sm-4 actTopRightContainer">
            <span>{user.terms.length}</span>
            <span>Terms<br />submitted</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountHeader;