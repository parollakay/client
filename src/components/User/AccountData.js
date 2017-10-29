import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import {Link} from 'react-router-dom';
import {titleCase} from '../../utils';
import moment from 'moment';
import Badge from './Badge';
const AccountData = props => {
  if (!props.achievements) return null;
  for (let i = 0; i < props.myAchievements.length; i++) {
    for (let j = 0; j < props.achievements.length; j++) {
      if (props.achievements[j].min === props.myAchievements[i].min) {
        props.achievements.splice(j,1);
      }
    }
  }
  return (
    <div className="accountTabs">
      <Tabs>
        {props.achievements && <Tab label="Achievements">
          <h4>Achievements</h4>
          <p className="lead">You earn achievements by submitting terms to the dictionary. The ones you have already earned are marked with a ribbon</p>
          <div className="row acctAchievements">
            {props.myAchievements.map((achievement, index) => <Badge key={`mainAchievements+${index}`} achievement={achievement} has={true} />)}
            {props.achievements.map((achievement, index) => <Badge key={`mainAchievements+${index}`} achievement={achievement} has={false} />)}
          </div>
        </Tab>}
        {props.terms && 
        <Tab label="Submitted Terms">
          <h4>Your Terms</h4>
          <p className="lead">These are all the terms you have submitted. <Link to="/newTerm">Submit another <i className="ion-ios-arrow-thin-right"></i></Link></p>
          {props.terms.length < 1 && <div><p className="lead">If you had submitted any terms, we would show them here. What you waiting for?</p><Link className="btn btn-primary" to="/addTerm">Add Term</Link></div>}
          {props.terms.length > 0 &&
          <table className="table table-condensed table-responsive termTable table-striped">
            <thead>
              <tr>
                <th></th>
                <th>Term</th>
                <th>Submitted</th>
                <th>Likes</th>
                <th>Sentences</th>
              </tr>
            </thead>
            <tbody>
              {props.terms.map((term, i) => {
                return (
                  <tr key={`term${i}`}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`/search?term=${term.text}`}>
                        <span>{titleCase(term.text)}</span>
                        <span>{term.definition}</span>
                      </Link>                      
                    </td>
                    <td>{moment(term.created).format('MMM Do, YYYY')}</td>
                    <td>{term.upvotes}</td>
                    <td>{term.sentences.length}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>}
        </Tab>}       
      </Tabs> 
    </div>
  )
}

export default AccountData;
