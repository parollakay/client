import React, { Component } from 'react';

class Sentences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termId: props.termId,
      showAll: false,
      sentences: props.sentences
     };
    this.showAll = this.showAll.bind(this);
  }
  showAll() {
    this.setState({
      showAll: true
    })
  }
  componentDidMount(){
    console.log(this.state)
  }
  render() {
    return (
      <ul className="termSentences">
        <span className="showMoreLink">{this.state.sentences.length} Sentences/Examples</span>
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

export default Sentences;