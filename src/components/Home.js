import React, { Component } from 'react';
import Terms from './Terms';
import { connect } from 'react-redux';
import { getTerms } from '../actions';
import { bindActionCreators } from 'redux';
import MainSideBar from './Sidebar/MainSideBar';

class Home extends Component {
  componentDidMount() {
    this.props.getTerms();
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
          <Terms terms={this.props.terms.data} />
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
  const boundActionCreators = bindActionCreators({ getTerms }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}


export default connect(mapStateToProps, mapDispatch)(Home);