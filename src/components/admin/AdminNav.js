import React from 'react';
import { Link } from 'react-router-dom'


const AdminNav = props => {
  return (
    <div className="adminNavList">
      <div className="container container-small">
        <div className="row">
          <ul className="col-md-12">
            <li>
              <Link to="/Manager" className="icon-first">
                <i className="glyphicon glyphicon-home"></i>
                Manager Home
              </Link>
            </li>
            <li>
              <Link to="/Manager/Users" className="icon-first">
                <i className="glyphicon glyphicon-user"></i>
                Users
              </Link>
            </li>
            <li>
              <Link to="/Manager/Terms" className="icon-first">
                <i className="glyphicon glyphicon-text-size"></i>
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminNav;