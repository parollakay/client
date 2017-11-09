import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { server  } from '../../utils';
import { showSnack } from '../../actions';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      users: []
    }
  }

  handleUserSuspend = user => {
    console.log(`clicked to toggle active state of ${user.username}`, user)
    const token = localStorage.getItem('x-access-token');
    axios.put(`${server}/users/${user._id}/toggleActive`)
      .then(res => {
        const users = this.state.users;
        const message = res.data.active ? `${user.username} is now active` : `${user.username} is now inactive.`
        for (let i = 0; i < users.length; i++)
          if (users[i]._id === res.data._id)  users[i] = res.data;
        this.setState({ users });
        this.props.showSnack(message);
      })
      .catch(e => e.response ? this.setState({ errors: this.state.errors.concat(e.response.data.message )}) : this.setState({ errors: this.state.errors.concat(`Error toggling active state for ${user.username}`)}))
    
  }
  componentDidMount() {
    const token = localStorage.getItem('x-access-token');
    axios.get(`${server}/users/all?token=${token}`).then(res => {
      this.setState({ users: res.data });
    }, e => this.setState({ errors: this.state.errors.concat('Error getting user information.')}));

  }
  render() {
    return (
      <div>
        this is the Users page
        <p>Need to add buttons to take full actions on all users: fix created dates,</p>
        {this.state.users.length > 0 &&
        <table  className="table table-responsive data-tbl">
          <thead>
            <tr>
              <th></th>
              <th>User</th>
              <th>Joined</th>
              <th>Terms</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, i) => {
              return (
                <tr key={`user-${i}`} className={user.active ? `eachUser` : `eachUser userSuspended`}>
                  <td>{i + 1}</td>
                  <td>
                    <Link to={`/Manager/User/${user._id}`}>
                      <strong>{user.username}</strong>{user.achievements.length > 0 && <span> · <i className="ion-ribbon-b"></i> {user.achievements[user.achievements.length - 1].name}</span>}
                      <small>{user.email}</small>
                    </Link>
                  </td>
                  <td>{moment(user.created).format('Mo DD, YYYY')}</td>
                  <td>{user.terms.length}</td>
                  <td className="tblActions">
                    <Link to={`/Manager/User/${user._id}`}>
                      View
                    </Link>
                    <a onClick={() => this.handleUserSuspend(user)} className={user.active ? 'hover' : 'hover btn-danger'}>
                      Suspend
                    </a>
                    <Link to={`/Manager/User/${user._id}/sendEmail`}>
                      Email
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.user.authenticated
  }
}

const mapDispatch = dispatch => {
  const boundActionCreators = bindActionCreators({ showSnack}, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}

export default connect(mapStateToProps, mapDispatch)(Users);