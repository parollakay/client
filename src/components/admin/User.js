import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { server } from '../../utils';
import { showSnack } from '../../actions';
import axios from 'axios';
import moment from 'moment';
import { Link, Route } from 'react-router-dom';
import SendEmail from './SendEmail';
import ChangePassword from './ChangePassword';
import PageShell from '../../PageShell';
import UserTop from '../User/Top';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      errors: [],
    };
  }

  handleUserSuspend = () => {
    const token = localStorage.getItem('x-access-token');
    axios
      .put(`${server}/users/${this.state.user._id}/toggleActive`)
      .then((res) => {
        const message = res.data.active
          ? `${this.state.user.username} is now active`
          : `${this.state.user.username} is now inactive.`;
        this.setState({ user: res.data });
        this.props.showSnack(message);
      })
      .catch(e =>
        (e.response
          ? this.setState({ errors: this.state.errors.concat(e.response.data.message) })
          : this.setState({
            errors: this.state.errors.concat(`Error toggling active state for ${this.state.user.username}`),
          })));
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`${server}/users/${id}/populatedUser`)
      .then((res) => {
        console.log(res.data);
        this.setState({ user: res.data });
      })
      .catch(e =>
        (e.response
          ? this.setState({ errors: this.state.errors.concat(e.response.data.message) })
          : this.setState({ errors: this.state.errors.concat('Error getting user data.') })));
  }
  render() {
    const { user } = this.state;
    if (this.state.errors.length < 1 && !this.state.user.username) {
      return <h3 className="title">Loading...</h3>;
    }
    return (
      <div>
        <div className="clearfix">
          <Link to="/Manager/Users">&laquo; All Users.</Link>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h2 className="title">{user.username}</h2>
            <p className="atEmail">
              {user.achievements.length > 0 && (
                <span>
                  <i className="ion-ribbon-b" />{' '}
                  {user.achievements[user.achievements.length - 1].name} ·{' '}
                </span>
              )}
              {user.email}
            </p>
            <small>Member since {moment(user.created).format('MMMM Do, YYYY')} </small>
          </div>
          <div className="col-md-6">
            <ul className="userActionLinks">
              <li>
                <Link to={`/Manager/User/${user._id}/email`} className="btn btn-default">
                  Send Email
                </Link>
              </li>
              <li>
                <a className="icon-first hover btn btn-default" onClick={this.handleUserSuspend}>
                  {this.state.user.active ? 'Suspend' : 'Suspended'}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Route
          path="/Manager/User/:id/email"
          exact
          component={PageShell(() => <SendEmail user={user} />)}
        />
        <Route path="/Manager/User/:id/changePw" exact component={PageShell(ChangePassword)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
});

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({ showSnack }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
};

export default connect(mapStateToProps, mapDispatch)(User);
