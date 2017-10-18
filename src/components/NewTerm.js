import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { newTerm, termErr } from '../actions';

class NewTerm extends Component {
  processNewTerm({ text, definition, sentence, tags}) {
    if(!this.props.user.authenticated) return this.props.termErr('You must be logged in to create a definition.');
    const sentences = [];
    if (tags) tags = tags.split(',');
    if (sentence) sentences.push({ text: sentence, author: this.props.user.data._id});
    const author = this.props.user.data._id;
    this.props.newTerm(text, definition, sentences, author, tags, this.props.history);
  }
 
  renderAlert = () => {
    if(!this.props.error) return null;
    return (
      <div className="alert alert-danger">
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;&nbsp;
        <span className="sr-only">Error:</span>
        {this.props.error}
      </div>
    )
  } 
  render() {
    const { handleSubmit } = this.props;
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
            <Field component="input" type="text" placeholder="Word" name="text" className="form-control"/>
          </div>
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
  const boundActionCreators = bindActionCreators({ newTerm, termErr }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}

NewTerm = connect(mapStateToProps, mapDispatch)(NewTerm);

export default reduxForm({
  form: 'newTerm',
  fields: ['text', 'definition', 'sentence', 'tags'],
})(NewTerm);