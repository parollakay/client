import React, { Component } from 'react';



class SentenceInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false
    }
    this.showSubmit = this.showSubmit.bind(this)
    this.hideSubmit = this.hideSubmit.bind(this)
  }

  showSubmit() {
    this.setState({
      focus: true
    })
  }

  hideSubmit() {
    this.setState({
      focus: false
    })
  }
  render() {
    return (
      <div className="termBtm">
        <form className="newSentenceForm">
          <input type="text" 
            placeholder="Write a sentence/example..." 
            name="newSentence" 
            onFocus={this.showSubmit}
            onBlur={this.hideSubmit}
            />
          {
            this.state.focus &&
            <button type="submit">Post</button>
          }          
        </form>
      </div>
    )
  }
}

export default SentenceInput;