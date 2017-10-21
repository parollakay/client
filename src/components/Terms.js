import React from 'react';
import './terms.css'
import Term from './Term/index'

const Terms = (props) => {
  if (props.terms.length < 1) return <h2>Loading...</h2>;
  
  return (
    <div>
      {props.terms.map((term, i) => {
        return <Term term={term} sentences={term.sentences} likes={term.upvotes} termId={term._id} key={i + 'term'} index={i} length={props.length} />
      })}
    </div> 
  )
}
export default Terms
