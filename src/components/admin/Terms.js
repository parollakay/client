import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { server } from '../../utils';
import { showSnack, getTerms } from '../../actions';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      terms: [],
    };
  }

  handleTermHide = (term) => {
    console.log(`clicked to toggle active state of ${term.text}`, term);
    const token = localStorage.getItem('x-access-token');
    axios
      .put(`${server}/terms/${term._id}/toggleLive?token=${token}`)
      .then((res) => {
        const terms = this.state.terms;
        const message = res.data.live ? `${term.text} is now live` : `${term.text} is now hidden.`;
        for (let i = 0; i < terms.length; i++) {
          if (terms[i]._id === res.data._id) terms[i] = res.data;
        }
        this.setState({ terms });
        this.props.showSnack(message);
      })
      .catch(e =>
        (e.response
          ? this.setState({ errors: this.state.errors.concat(e.response.data.message) })
          : this.setState({
            errors: this.state.errors.concat(`Error toggling active state for ${term.text}`),
          })));
  };

  componentDidMount() {
    axios.get(`${server}/terms/all`).then((res) => {
      this.setState({ terms: res.data });
    }, e => (e.response ? this.setState({ errors: this.state.errors.concat(e.response.data.message) }) : this.setState({ errors: this.state.errors.concat('Error getting terms') })));
  }
  render() {
    return (
      <div>
        this is the Terms page
        {this.state.terms.length > 0 && (
          <table className="table table-responsive data-tbl">
            <thead>
              <tr>
                <th />
                <th>Term</th>
                <th>Created</th>
                <th>Sentences</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.terms.map((term, i) => (
                <tr key={`term-${i}`} className={term.live ? 'eachUser' : 'eachUser userSuspended'}>
                  <td>{i + 1}</td>
                  <td>
                    <Link to={`/Manager/Term/${term._id}`}>
                      <strong>{term.text}</strong>
                      <small>{term.definition}</small>
                    </Link>
                  </td>
                  <td style={{ width: '15%' }}>{moment(term.created).format('MMM DD, YYYY')}</td>
                  <td>{term.sentences.length}</td>
                  <td className="tblActions" style={{ width: '25%' }}>
                    <Link to={`/Manager/Term/${term._id}`}>View</Link>
                    <a className="hover" onClick={() => this.handleTermHide(term)}>
                      {term.live ? 'Hide' : 'Show'}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  terms: state.terms.data,
  error: state.terms.error,
});

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({ getTerms, showSnack }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
};

export default connect(mapStateToProps, mapDispatch)(Terms);
