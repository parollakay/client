import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { server  } from '../../utils';
import { showSnack, getTerms } from '../../actions';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      terms: []
    }
  }

  componentDidMount() {
    this.props.getTerms();
  }
  render() {
    return (
      <div>
        this is the Terms page
        {this.state.terms.length > 0 &&
        <table  className="table table-responsive data-tbl">
          <thead>
            <tr>
              <th></th>
              <th>Term</th>
              <th>Created</th>
              <th>Sentences</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.terms.map((term, i) => {
              return (
                <tr key={`term-${i}`} className={term.live ? `eachUser` : `eachUser userSuspended`}>
                  <td>{i + 1}</td>
                  <td>
                    <Link to={`/Manager/Term/${term._id}`}>
                      <strong>{term.text}</strong>
                      <small>{term.definition}</small>
                    </Link>
                  </td>
                  <td>{moment(term.created).format('Mo DD, YYYY')}</td>
                  <td>{term.sentences.length}</td>
                  <td className="tblActions">
                    <Link to={`/Manager/Term/${term._id}`}>
                      View
                    </Link>
                    <a className="hover" onClick={() => this.handleTermSuspend(term)}>
                      {term.active ? `Suspend` : `Suspended`}
                    </a>
                    <Link to={`/Manager/Term/${term._id}/sendEmail`}>
                      Email
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.user.authenticated,
    terms: state.terms.data,
    error: state.terms.error
  }
}

const mapDispatch = dispatch => {
  const boundActionCreators = bindActionCreators({ getTerms, showSnack}, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}

export default connect(mapStateToProps, mapDispatch)(Terms);