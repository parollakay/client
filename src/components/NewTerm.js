import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewTerm extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="newTermPage" className="col-md-8 col-md-offset-2">
        <h3 className="title">Add New Term</h3>
        <p className="category">
          All the definitions on <strong>Parol Lakay</strong> were written by people just like you. Now's your chance to add your own!
        </p>
        <hr />
        <form>
          <div className="form-group">
            <label>Word or Term</label>
            <input type="text" placeholder="Word" name="text" className="form-control"/>
          </div>
          <br />
          <p className="description">
            <strong>Write for a large audience.</strong> Lots of people will readt this, so give some background information.
            <br />
            <strong>Don't name your friends.</strong> We will reject inside jokes and definitions naming non-celebrities.
          </p>
          <div className="form-group">
            <label>Definition</label>
            <textarea className="form-control" name="definition" placeholder="Type your definition here..."></textarea>
          </div>
          <div className="form-group">
            <label>Sentence/Example</label>
            <textarea className="form-control" name="sentence" placeholder="(Optional) Type an example of how it is used in a sentence..."></textarea>
          </div>
          <div className="form-group">
            <label>Tags</label>
            <input type="text" name="tags" placeholder="Type a list of comma-separated tags..." className="form-control" />
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

export default NewTerm;