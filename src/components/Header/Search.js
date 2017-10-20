import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchTerm } from '../../actions';
import { withRouter } from 'react-router-dom';

class Search extends Component {
  constructor (props) {
    super(props);
    this.state = { }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.searchTerm(e, this.props.history);
  }
  render() {
    return (
      <div className="searchInput">
        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="search" name="parolLakaySearch" placeholder="Type any word..." />
          <button className="searchIcon" type="submit">
            <i className="ion-search"></i>
          </button>
          <button className="addIcon" type="button">
            <i className="ion-plus"></i>
          </button>
        </form>
      </div>
    )
  };
}


export default withRouter(Search);