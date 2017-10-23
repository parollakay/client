import React from 'react';
import { clearTermErr } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const TermErr = props => {
  return (
    <div className="alert alert-danger">
      <button onClick={props.clearTermErr} type="button" className="close"><span aria-hidden="true">&times;</span></button>
      <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;&nbsp;
      <span className="sr-only">Error:</span>
      {props.err}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    error: state.terms.error
  }
}

const mapDispatch = dispatch => {
  const boundActionCreators = bindActionCreators({ clearTermErr }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}
export default connect(mapStateToProps, mapDispatch)(TermErr);