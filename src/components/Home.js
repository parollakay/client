import React, { Component } from 'react';
import Terms from './Terms';
import WeeklyWord from './Sidebar/WeeklyWord';
import AddTerm from './Sidebar/AddTerm';
import { SocialIcons, FacebookPagePlugin, FooterText } from '../utils';
import { connect } from 'react-redux';
import { getTerms } from '../actions';
import { bindActionCreators } from 'redux';

class Home extends Component {

  componentDidMount() {
    this.props.getTerms();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <Terms terms={this.props.terms.data} />
        </div>
        <div className="col-md-4">
          <AddTerm />
          <div className="sbSocial">
            <SocialIcons />
          </div>
          <WeeklyWord />
          <FacebookPagePlugin />
          <FooterText />
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    terms: state.terms
  }
}

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({ getTerms }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}


export default connect(mapStateToProps, mapDispatch)(Home);