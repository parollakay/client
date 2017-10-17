import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addSentence } from '../../actions'



class SentenceInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termId: props.term,
      focus: false
    }
    this.showSubmit = this.showSubmit.bind(this);
    this.hideSubmit = this.hideSubmit.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    const text = e.target.text.value;
    if (!this.props.user.authenticated) return this.setState({
      error: 'You must be logged in to submit a sentence/example.'
    });
    const author = this.props.user.data._id;
    const { termId } = this.state;
    this.props.addSentence(termId, author, text, this.props.history);
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

  renderAlert = () => {
    if(!this.state.error) return null;
    return (
      <div className="text-danger">
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;&nbsp;
        <span className="sr-only">Error:</span>
        {this.state.error}
      </div>
    )
  } 
  
  render() {
    return (
      <div>
        {this.renderAlert()}
        <div className="termBtm" >
          <form className="newSentenceForm" onSubmit={e => this.submitForm(e)}>
            <input type="text" 
              placeholder="Write a sentence/example..." 
              name="text" 
              onFocus={this.showSubmit}
              onBlur={this.hideSubmit}
              />
            {
              this.state.focus &&
              <button type="submit">Post</button>
            }          
          </form>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    terms: state.terms,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({ addSentence }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}

export default connect(mapStateToProps, mapDispatch)(SentenceInput);

