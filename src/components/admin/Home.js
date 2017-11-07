import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      reported: [],
      recentTerms: [],
      recentUsers: [],
    }
  }
 

  componentDidMount() {
    const token = localStorage.getItem('x-access-token');
    axios.get(`${server}/terms/reportedTerms?token=${token}`)
      .then(res => this.setState({ reported: res.data }), e => this.setState({ errors: this.state.errors.concat('Could not get reported terms.')}));
    axios.get(`${server}/terms/recentTerms?token=${token}`)
      .then(res => this.setState({ recentTerms: res.data }), e => this.setState({ errors: this.state.errors.concat('Couldnt get the recent terms.')}));
    axios.get(`${server}/users/latestUsers?token${token}`)
      .then(res => this.setState({ recentUsers: res.data }), e => this.setState({ errors: this.state.errors.concat('Could not get recent users.')}));
  }

  render () {
    return (
      <div>
        <h3 className="title">
          Welcome {this.props.user.username}.
        </h3>
        <p className="lead">Here, we manage the crowdsourced dictionary.</p>
        <div className="row adminHomeBlocks">
          <div className="col-md-4">
            <h5 className="title icon-first">
              Reported Terms
              <small>
                <Link to="/Manager/Terms">
                  All terms
                </Link>
              </small>
            </h5>
            <ul>
              {this.state.reported.length < 1 && <li><p>There are no reported terms.</p></li>}
              {this.state.reported.map((term, i) => {
                return (
                  <li key={`reported-${i}`}>
                    <Link to={`/Manager/Term/${term._id}`} className="icon-first">
                      <i className="glyphicon glyphicon-flag"></i>
                      {term.text}
                    </Link>
                    <small>Counts: {term.incidences.length}</small>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="title icon-first">
              Recent Terms
              <small>
                <Link to="/Manager/Terms">
                  All terms
                </Link>
              </small>
            </h5>
            <ul>
              {this.state.recentTerms.length < 1 && <li><p>There are no recent terms.</p></li>}
              {this.state.recentTerms.map((term, i) => {
                return (
                  <li key={`recentTerms-${i}`}>
                    <Link to={`/Manager/Term/${term._id}`} className="icon-first">
                      <i className="glyphicon glyphicon-pencil"></i>
                      {term.text}
                    </Link>
                    <small>{term.author.username} - {moment(term.created).fromNow()}</small>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="title icon-first">
              Recent Accounts
              <small>
                <Link to="/Manager/Users">
                  All Users
                </Link>
              </small>
            </h5>
            <ul>
              {this.state.recentUsers.length < 1 && <li><p>There are no recent users.</p></li>}
              {this.state.recentUsers.map((user, i) => {
                return (
                  <li key={`recentUsers-${i}`}>
                    <Link to={`/Manager/User/${user._id}`} className="icon-first">
                      <i className="glyphicon glyphicon-user"></i>
                      {user.username}
                    </Link>
                    <small>{moment(user.created).fromNow()}</small>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    ) 
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.data
  }
}




export default connect(mapStateToProps)(Home);