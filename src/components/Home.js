import React from 'react';
import Terms from './Terms';
import WeeklyWord from './Sidebar/WeeklyWord';
import AddTerm from './Sidebar/AddTerm';
import { SocialIcons, FacebookPagePlugin, FooterText } from '../utils';

const Home = (props) => {
  return (
    <div className="row">
      <div className="col-md-8">
        <Terms />
      </div>
      <div className="col-md-4">
        <AddTerm />
        <div className="sbSocial">
          <SocialIcons />
        </div>
        <WeeklyWord />
        <FacebookPagePlugin />
        <FooterText />
      </div>
    </div>
  )
};

export default Home;