import React from 'react';

const TermBadge = props => {
  let type;
  switch(props.type) {
    case 'danger':
      type = 'badge-danger';
      break;
    case 'highlight':
      type = 'badge-yellow';
      break;
    case 'info':
      type = 'badge-info';
      break;
    default:
      type = 'badge-info';
      break;
  }
  return (
    <div className={`stBadge ${type}`}>
      {props.text}
    </div>
  )
}

export default TermBadge;