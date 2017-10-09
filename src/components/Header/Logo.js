import React from 'react';
import { Link } from 'react-router-dom';

const Logo = (props) => {
  return (
    <div className="logoWrapper col-sm-1">
      <Link to="/">
        <div className="logoSquare">
          <img src="img/logo_white.png" alt="Parol Lakay" />
        </div>
        <div className="logoText">
          <img src="img/logo_white_text.png" alt="Paol Lakay" />
        </div>
      </Link>
    </div>
  )
}

export default Logo;