import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '../../actions';
import axios from 'axios';
import { server } from '../../utils';

class WeeklyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null
    }
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const body = { email: e.target.email.value }
    axios.post(`${server}/users/subToWeeklyWord`, body).then(res => {
      if (res.data.message) return this.setState({ alert: { success: res.data.message} });
      if (this.props.authenticated) {
        if (this.props.user._id === res.data._id) return this.props.updateUser(res.data);
      } else {
        this.setState({ alert: { success: 'You have been subscribed' } });
      }
    }, e => {
      const error = e.response.data.message || 'Error adding to list.';
      this.setState({ alert: { error } })
    })
  }

  renderAlert = () => {
    if (!this.state.alert) return null
    if (this.state.alert.error) {
      return (
        <div className="text-danger">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;&nbsp;
          <span className="sr-only">Error:</span>
          {this.state.alert.error}
        </div>
      )
    }
    if (this.state.alert.success) {
      return (
        <div className="text-success">
          <span className="sr-only">Error:</span>
          {this.state.alert.success}
        </div>
      )
    }
  }
  render() {
    if (this.props.user.newsletter) return null;
    return (
      <div className="weeklyForm">
        <h3><strong>Subscribe</strong> to Word of the Week.</h3>
        {this.renderAlert()}
        <form onSubmit={e => this.handleFormSubmit(e)}>
          <div className="form-group">
            <input type="email" placeholder="Enter Email here..." name="email" />
          </div>
          <button type="submit">
            <i className="ion-paper-airplane"></i>
          </button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    authenticated: state.user.authenticated
  }
}

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({ updateUser }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}


export default connect(mapStateToProps, mapDispatch)(WeeklyForm);