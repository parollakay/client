import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { newTerm, termErr, changefieldValue, openDialog } from '../actions';
import TermErr from './Term/TermErr';
import { server, titleCase } from '../utils';
import axios from 'axios';

class NewTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: []
    }
  }

  cleanPhrase = phrase => {
    if (phrase.charAt(0) === ' ') phrase = phrase.slice(1);
    if (phrase.charAt(phrase.length - 1) === ' ') phrase.slice(0, phrase.length - 1);
    return phrase.toLowerCase();
  }

  processNewTerm({ text, definition, sentence, tags}) {
    if(!this.props.user.authenticated) return this.props.termErr('You must be logged in to create a definition.');
    const sentences = [];
    if (tags) tags = tags.split(',').map(tag => this.cleanPhrase(tag));
    if (sentence) sentences.push({ text: sentence, author: this.props.user.data._id});
    const word = this.cleanPhrase(text);
    const author = this.props.user.data._id;
    const badges = this.props.user.data.achievements;
    this.props.newTerm(word, definition, sentences, author, tags, badges, this.props.history);
  }
 
  renderAlert = () => {
    if(!this.props.error) return null;
    return <TermErr err={this.props.error} />
  }

  componentDidMount() {
    let query;
    if (this.props.location.search.length > 1) { query = decodeURI(this.props.location.search.slice(6)); }
    this.props.initialize({ text: query});
    window.title = "Add a term - Parol Lakay";
  }
  
  HandleWordBlur = (e) => {
    axios.get(`${server}/terms/search?term=${this.cleanPhrase(e.target.value)}`).then(res => {
      this.setState({
        terms: res.data
      })
    }, e => this.setState({ terms: [] }));
  }

  render() {
    const { handleSubmit } = this.props;
    if (!this.props.user.authenticated) return (
      <div>
        <h3 className="title">You must be logged in to add a new term.</h3>
        <p className="lead">Please <a className="hover" onClick={this.props.openDialog}>Login now, or create</a> an account to contribute to the dictionary.</p>
      </div>
    )
    return (
      <div id="newTermPage" className="col-md-8 col-md-offset-2">
        <h3 className="title">Add New Term</h3>
        <p className="category">
          All the definitions on <strong>Parol Lakay</strong> were written by people just like you. Now's your chance to add your own!
        </p>
        {this.renderAlert()}
        <hr />
        <form onSubmit={handleSubmit(this.processNewTerm.bind(this))}>
          <div className="form-group">
            <label>Word or Term *</label>
            <Field component="input" type="text" placeholder="Word" name="text" className="form-control" onBlur={e => this.HandleWordBlur(e)}/>
          </div>
          {
            this.state.terms.length > 0 && 
            <ul className="autoCompletedTerms">
              <li><b>{this.state.terms.length}</b> Current definition{this.state.terms.length > 1 && 's'} for this term.</li>
              {this.state.terms.map((term, i) => {
                return (
                  <li key={`returned${i}`}>
                    <strong>{titleCase(term.text)}</strong> <span>{term.definition}</span>
                  </li>
                )
              })}
            </ul>
          }
          <br />
          <p className="description">
            <strong>Write for a large audience.</strong> Lots of people will read this, so give some background information.
            <br />
            <strong>Don't name your friends.</strong> We will reject inside jokes and definitions naming non-celebrities.
          </p>
          <div className="form-group">
            <label>Definition *</label>
            <Field component="textarea" className="form-control" name="definition" placeholder="Type your definition here..." />
          </div>
          <div className="form-group">
            <label>Sentence/Example</label>
            <Field component="textarea" className="form-control" name="sentence" placeholder="(Optional) Type an example of how it is used in a sentence..." />
          </div>
          <div className="form-group">
            <label>Tags</label>
            <Field component="input" type="text" name="tags" placeholder="Type a list of comma-separated tags..." className="form-control" />
          </div>
          <p className="addTermAdv">
            Definitions are subject to our <Link to="/termsOfService">terms of service</Link> and <Link to="/privacyStatement">privacy policy</Link>.
          </p>
          <br />
          <button className="btn btn-block btn-primary" type="submit">
            Submit!
          </button>
          <br /><br />
        </form>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    error: state.terms.error,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({ newTerm, termErr, changefieldValue, openDialog }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}

NewTerm = connect(mapStateToProps, mapDispatch)(NewTerm);

export default reduxForm({
  form: 'newTerm',
  fields: ['text', 'definition', 'sentence', 'tags'],
})(NewTerm);