import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { server } from '../../utils';
import {} from '../../actions';
import axios from 'axios';

class Term extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: {},
      errors: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`${server}/terms/single/${id}`)
      .then(
        res => this.setState({ term: res.data }),
        e => this.setState({ errors: this.state.errors.concat('Could not get term data.') }),
      );
  }
  render() {
    if (!this.state.term.text && this.state.errors.length < 1) {
      return <h3 className="title">Loading...</h3>;
    }
    return <div />;
  }
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
});

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({}, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
};

export default connect(mapStateToProps, mapDispatch)(Term);
