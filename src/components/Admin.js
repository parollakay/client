import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import {} from '../utils';
import AdminNav from './admin/AdminNav';
import './admin/admin.css';
import PageShell from '../PageShell';
import Home from './admin/Home';
import Users from './admin/Users';
import User from './admin/User';
import Terms from './admin/Terms';
import Term from './admin/Term'

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    console.log(localStorage.getItem('x-user-role'));
    if (localStorage.getItem('x-user-role') !== 'super' && localStorage.getItem('x-user-role') !== 'admin') return (
      <div>
        <h3 className="title">Permission Required</h3>
        <p className="lead">You must be logged in as an admin in order to access what lies within these walls...</p>
      </div>
    )
    return (
      <div className="adminPage">
        <AdminNav />
        <div className="AdminWrapper">
          <Route path="/Manager/" exact component={PageShell(Home)} />

          <Route path="/Manager/Users" component={PageShell(Users)} />
          <Route path="/Manager/User/:id" component={PageShell(User)} />
          <Route path="/Manager/Terms" component={PageShell(Terms)} />
          <Route path="/Manager/Term/:id" component={PageShell(Term)} />
        </div>
      </div>
    )
  }
}


export default AdminPage;

