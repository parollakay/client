import React, { Component } from 'react';
import MainSideBar from './Sidebar/MainSideBar';
import Terms from './Terms';
import axios from 'axios';
import { server, titleCase } from '../utils';
import { Link } from 'react-router-dom';
import TermErr from './Term/TermErr';

class QueryTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: []
    }
  }

  getTerms = (search) => {
    axios.get(`${server}/terms/search${search}`).then(res => {
      this.setState({
        terms: res.data
      });
    }, err => err.response ? this.setState({ error: err.response.data.message}) : this.setState({ error: 'Error searching for the term.'}) );
    this.setState({
      search,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { search } = nextProps.location;
    this.getTerms(search);
  }
  componentDidMount() {
    const { search } = this.props.location;
    this.getTerms(search);
  }

  renderAlert = () => {
    if(!this.state.error) return null;
    return <TermErr err={this.state.error} />
  }
  render() {
    let search = ''
    const hash = this.props.location.search;
    if (hash.slice(1,5) === 'term') {
      search = decodeURI(hash.slice(6))
    } else {
      search = decodeURI(hash.slice(8))
    }
    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="strongTitle"><strong>Search:</strong> {titleCase(decodeURI(search))}</h3>
        </div>
        <div className="col-md-8">
          {this.renderAlert()}
          {this.state.terms.length > 0 ? <Terms terms={this.state.terms} length={this.state.terms.length} /> : <h4>There are no results for that.</h4>}
          {this.state.terms.length === 0 && 
            <div>
              {search.length > 1 &&
              <div>
                <p className="lead"> 
                  You should <Link to={`/newTerm?text=${search}`} className="highlightText">add <strong>'{titleCase(search)}'</strong></Link> to our dictionary.
                </p>
                <Link to={`/newTerm?text=${search}`} className="btn btn-primary">
                  Add [ {titleCase(search)} ] to Parol Lakay
                </Link>
              </div>}
            </div>         
          }
        </div>
        <div className="col-md-4">
          <MainSideBar />
        </div>
      </div>
    )
  }
}

export default QueryTerm;