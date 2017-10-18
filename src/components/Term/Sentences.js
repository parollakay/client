import React, { Component } from 'react';

class Sentences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termId: props.termId,
      showAll: false,
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
        <span className="showMoreLink">{this.props.sentences.length} Sentence{this.props.sentences.length > 1 && `s`}/Example{this.props.sentences.length > 1 && `s`}</span>
        {this.state.showAll 
          ? this.props.sentences.map((sentence, i) => ( <li key={`${i}-sentence-for-${this.state.termId}`}> <p><strong>{sentence.author.username}</strong> <span>{sentence.text}</span></p> </li> ))
          : this.props.sentences.map((sentence, i) => {
            return ( 
              i < 2 && <li key={`${i}-sentence-for-${this.state.termId}`}> <p><strong>{sentence.author.username}</strong> <span>{sentence.text}</span></p> </li> 
              )}
            )
        }
        {(this.props.sentences.length > 2 && !this.state.showAll) && <a onClick={this.showAll} className="showMoreLink">Show More...</a>}
      </ul>
    )
  }
}

export default Sentences;