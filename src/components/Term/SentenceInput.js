import React, { Component } from 'react';
import { titleCase } from '../../utils'

class SentenceInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false
    }
    this.showSubmit = this.showSubmit.bind(this);
    this.hideSubmit = this.hideSubmit.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    const text = e.target.text.value;
    this.props.addSentence(text);
    e.target.text.value = '';
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
      <div>
        <div className="termBtm" >
          <form className="newSentenceForm" onSubmit={e => this.submitForm(e)}>
            <input type="text" 
              placeholder={`Use (${titleCase(this.props.text)}) in a sentence...`}
              name="text" 
              onFocus={this.showSubmit}
              />
            {
              this.state.focus &&
              <button action="submit">Post</button>
            }          
          </form>
        </div>
      </div>
    )
  }
}





export default SentenceInput;

