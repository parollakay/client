import React from 'react';
import moment from 'moment';

const AccountHeader = props => {
  const { user } = props;
  return (
    <div className="row accountTop">
      <div className="col-md-6">
        <h2>{user.username}</h2>
        <p className="atEmail">
          {user.achievements.length > 0 && <span>{user.achievements[user.achievements.length - 1].name} · </span>}
          {user.email}
        </p>
        <small>Member since {moment(user.created).format('MMMM Do, YYYY')} </small>
        <br />
        <div className="topActions">
          <a className="icon-first">
            <i className="glyphicon glyphicon-lock"></i>
            Change Password
          </a>
          &nbsp;&nbsp;·&nbsp;&nbsp; 
          <a className="icon-first">
            <i className="glyphicon glyphicon-log-out"></i>
            Log Out
          </a>
        </div>
        
      </div>
      <div className="col-md-6">
        <div className="row">
          <div className="col-sm-4 actTopRightContainer">
            3 <br /> badges
          </div>
          <div className="col-sm-4 actTopRightContainer">
            <h6>Your Activity</h6>
            10 terms <br />
            40 likes
          </div>
          <div className="col-sm-4 actTopRightContainer">
            <h6>Your terms</h6>
            50 Likes Total <br />
            20 Sentences
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountHeader;