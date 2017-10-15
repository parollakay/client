import React from 'react';
import { Link } from 'react-router-dom';

const AddTerm = (props) => {
  return (
    <div>
      <Link to="/newTerm" className="sbAddTerm">
        <div className="sbatTop">
          <h3>
            <strong>Parol Lakay</strong> is written by you!
          </h3>
          <p>Join now to start contributing.</p>
        </div>
        <div className="sbatBtm">
          Add A Word <i className="ion-ios-arrow-thin-right"></i>
        </div>
      </Link>
    </div>
  )
}


export default AddTerm