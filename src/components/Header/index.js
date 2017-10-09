import React, { Component } from 'react';
import './Header.css';
import Logo from './Logo';
import { MainNav, Search, SignupText } from './center';

class Header extends Component {

  render () {
    return (
        <header className="topHead">
          <div className="container-small container">
            <div className="row">
              <Logo />
              <div className="searchWrapper col-sm-11">
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