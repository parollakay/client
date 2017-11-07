import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { server  } from '../../utils';
import {} from '../../actions';
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
        {this.state.users.length > 0 &&
        <table  className="table table-responsive data-tbl">
          <thead>
            <tr>
              <th></th>
              <th>User</th>
              <th>Joined</th>
              <th>Terms</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, i) => {
              return (
                <tr key={`user-${i}`}>
                  <td>{i + 1}</td>
                  <td>
                    <Link to={`/Manager/User/${user._id}`}>
                      <strong>{user.username}</strong>{user.achievements.length > 0 && <span> · <i className="ion-ribbon-b"></i> {user.achievements[user.achievements.length - 1].name}</span>}
                      <small>{user.email}</small>
                    </Link>
                  </td>
                  <td>{moment(user.created).format('Mo DD, YYYY')}</td>
                  <td>{user.terms.length}</td>
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
  const boundActionCreators = bindActionCreators({}, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}

export default connect(mapStateToProps, mapDispatch)(Users);