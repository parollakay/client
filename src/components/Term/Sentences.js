import React, { Component } from 'react';
import { connect } from 'react-redux';

class Sentences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termId: props.termId,
      showAll: false,
      sentences: this.props.terms.filter(term => term._id === props.termId)[0].sentences
     };
    this.showAll = this.showAll.bind(this);
  }
  showAll() {
    this.setState({
      showAll: true
    })
  }
  render() {
    return (
      <ul className="termSentences">
        <span className="showMoreLink">{this.state.sentences.length} Sentence{this.state.sentences.length > 1 && `s`}/Example{this.state.sentences.length > 1 && `s`}</span>
        {this.state.showAll 
          ? this.state.sentences.map((sentence, i) => ( <li key={`${i}-sentence-for-${this.state.termId}`}> <p><strong>{sentence.author.username}</strong> <span>{sentence.text}</span></p> </li> ))
          : this.state.sentences.map((sentence, i) => {
            return ( 
              i < 2 && <li key={`${i}-sentence-for-${this.state.termId}`}> <p><strong>{sentence.author.username}</strong> <span>{sentence.text}</span></p> </li> 
              )}
            )
        }
        {(this.state.sentences.length > 2 && !this.state.showAll) && <a onClick={this.showAll} className="showMoreLink">Show More...</a>}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    terms: state.terms.data
  }
}
export default connect(mapStateToProps, {})(Sentences);