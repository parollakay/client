import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from './Logo';
import { MainNav, Search, SignupText } from './center';

class Header extends Component {

  render () {
    return (
      <header className="topHead">
        <div className="container">
          <div className="row">
            <Logo />
            <div className="searchWrapper col-md-7">
                <MainNav />
                <Search />
                <SignupText />
            </div>
          </div>
        </div>
      </header>
    )
  }
}



export default Header;