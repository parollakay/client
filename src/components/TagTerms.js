import React, { Component } from 'react';
import MainSideBar from './Sidebar/MainSideBar';
import Terms from './Terms';
import axios from 'axios';
import { server, titleCase } from '../utils';


class TagTerms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: []
    }
  }

  getTerms = (tag) => {
    axios.get(`${server}/terms/tag${tag}`).then(res => {
      this.setState({
        terms: res.data
      });
    }, err => err.response ? this.setState({ error: err.response.data.message}) : this.setState({ error: 'Error searching for the term.'}) );
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
    return (
      <div className="alert alert-danger">
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;&nbsp;
        <span className="sr-only">Error:</span>
        {this.state.error}
      </div>
    )
  } 
  render() {
    const tag = this.props.location.search.slice(5);
    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="strongTitle"><strong>Tag:</strong> #{titleCase(decodeURI(tag))}</h3>
        </div>
        <div className="col-md-8">          
          {this.renderAlert()}
          {this.state.terms.length > 0 ? <Terms terms={this.state.terms} length={this.state.terms.length} /> : <h4>There are no results for that tag</h4>}
        </div>
        <div className="col-md-4">
          <MainSideBar />
        </div>
      </div>
    )
  }
}

export default TagTerms;