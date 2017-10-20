import React from 'react';
import './Header.css';
import Logo from './Logo';
import { MainNav, Search, SignupText } from './center';


const Header = (props) => {
  return (
    <header className="topHead">
      <div className="container-small container">
        <div className="row">
          <Logo />
          <div className="searchWrapper col-sm-11">
              <MainNav />
              <Search history={props.history}/>
              <SignupText openAuth={props.openAuth} authenticated={props.authenticated}/>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;