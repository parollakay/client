import React from 'react';
import { Link } from 'react-router-dom';

const AddTerm = (props) => {
  return (
    <div>
      <Link to="/" className="sbAddTerm">
        <i className="ion-plus"></i>
        Add A Word
      </Link>
    </div>
  )
}


export default AddTerm