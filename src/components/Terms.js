import React from 'react';
import './terms.css'
import Term from './Term/index'

const Terms = (props) => {
  return (
    <div>
      {props.terms.map((term, i) => {
        return <Term termId={term._id} key={i + 'term'} />
      })}
    </div> 
  )
}
export default Terms
