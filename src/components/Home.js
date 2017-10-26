import React, { Component } from 'react';
import Terms from './Terms';
import { connect } from 'react-redux';
import { getTerms } from '../actions';
import { bindActionCreators } from 'redux';
import MainSideBar from './Sidebar/MainSideBar';
import TermErr from './Term/TermErr';

class Home extends Component {

  componentDidMount() {
    this.props.getTerms();
    document.title = "Parol Lakay - Home";
  }

  renderAlert = () => {
    if(!this.props.error) return null;
    return <TermErr err={this.props.error} />
  }
  
  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          {this.renderAlert()}
          <Terms terms={this.props.terms.data} />
        </div>
        <div className="col-md-4">
          <MainSideBar history={this.props.history}/>
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