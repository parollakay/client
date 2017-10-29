import React from 'react';
import moment from 'moment';

const Badge = props => {

  return (
    <div className={props.has ? `col-md-3 badgeHas` : `col-md-3`}>
      <div className="badgeContainer">
        <strong className="icon-first">
          {props.has && <i className="ion-ribbon-b"></i>}
          {props.achievement.name}
        </strong>
        {props.has && <small className="dateUnlocked">Unlocked {moment(props.achievement.created).fromNow()}</small>}
        <small>{props.achievement.min} word{props.achievement.min > 1 && `s`}</small>
        <small>{props.achievement.description}</small>
      </div>
    </div>
  )
}

export default Badge;