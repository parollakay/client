import React from 'react';

const WeeklyForm = (props) => {

  return (
    <div className="weeklyForm">
      <h3><strong>Subscribe</strong> to Word of the Week.</h3>
      <form>
        <div className="form-group">
          <input type="email" placeholder="Enter Email here..." name="email" />
        </div>
        <button type="submit">
          <i className="ion-paper-airplane"></i>
        </button>
      </form>
    </div>
  )
}

export default WeeklyForm;