import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchTerm } from '../actions';
import MainSideBar from './Sidebar/MainSideBar';
import Terms from './Terms';

class QueryTerm extends Component {

  componentDidMount() {
    const { search } = this.props.location;
    const term = search.slice(6);
    console.log(term);
    this.props.searchTerm(term);
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
    return (
      <div className="row">
        <div className="col-md-8">
          {this.renderAlert()}
          {this.props.terms.data.length > 0 ? <Terms terms={this.props.terms.data} /> : <h4>There are no terms for that term</h4>}
          
        </div>
        <div className="col-md-4">
          <MainSideBar />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    terms: state.terms,
    error: state.terms.error
  }
}

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({ searchTerm }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}
export default connect(mapStateToProps, mapDispatch)(QueryTerm);