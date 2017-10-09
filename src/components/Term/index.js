import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import MoreDropDown from './MoreDropDown'
import Engagement from './Engagement';
import Sentences from './Sentences';
import SentenceInput from './SentenceInput';


const cardStyle = {
  borderRadius: '4px',
  width: '100%',
  padding: '15px'
};

class Term extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: props.term
    }
  }

  render() {
    const { term } = this.state;
    return (
      <Paper className="eachTerm" style={cardStyle} zDepth={2}>
        <h3>{term.text}</h3>
        <MoreDropDown />
        <p className="termMeta" title={'Submitted ' + moment(term.created).format("MMM Do YYYY")}> by <strong>{term.author.username}</strong> {moment(term.created).fromNow()} </p>
        <p className="termDefinition">{term.definition}</p>
        <ul className="termsTags"> {term.tags.map((tag, i) => <li key={i}>#{tag}</li> )} </ul>
        <Engagement upvotes={term.upvotes} sentences={term.sentences} term={term.text} definition={term.definition}/>
        {term.sentences.length > 0 && <Sentences sentences={term.sentences} termId={term._id}/>}      
        <SentenceInput />
      </Paper>
    )
  }
}


export default Term;