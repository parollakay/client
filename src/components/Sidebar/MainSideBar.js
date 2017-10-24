import React from 'react';
import { SocialIcons, FacebookPagePlugin, FooterText } from '../../utils';
import WeeklyWord from './WeeklyWord';
import AddTerm from './AddTerm';

const MainSideBar = props => {
  return (
    <div>
      <AddTerm />
      <div className="sbSocial">
        <SocialIcons />
      </div>
      <WeeklyWord />
      <FacebookPagePlugin history={props.history}/>
      <FooterText />
    </div>
  )
}

export default MainSideBar;