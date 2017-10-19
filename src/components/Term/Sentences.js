import React, { Component } from 'react';

class Sentences extends Component {

  render() {
    return (
      <ul className="termSentences">
        <span className="showMoreLink">{this.props.sentences.length} Sentence{this.props.sentences.length > 1 && `s`}/Example{this.props.sentences.length > 1 && `s`}</span>
        {this.props.showAll
          ? this.props.sentences.map((sentence, i) => ( <li key={`${i}-sentence-for-${this.props.termId}`}> <p><strong>{sentence.author.username}</strong> <span>{sentence.text}</span></p> </li> ))
          : this.props.sentences.map((sentence, i) => {
            return ( 
              i < 2 && <li key={`${i}-sentence-for-${this.props.termId}`}> <p><strong>{sentence.author.username}</strong> <span>{sentence.text}</span></p> </li> 
              )}
            )
        }
        {(this.props.sentences.length > 2 && !this.props.showAll) && <a onClick={this.props.expand} className="showMoreLink">Show More...</a>}
      </ul>
    )
  }
}

export default Sentences;