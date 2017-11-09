import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../utils';
import { showSnack } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SendEmail extends Component {
  sendEmail = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('x-access-token');
    const email = {
      subject: e.target.subject.value,
      body: e.target.message.value,
    };
    const body = {
      user: this.props.user,
      email,
    };
    axios
      .post(`${server}/users/adminSendEmail?token=${token}`, body)
      .then((result) => {
        console.log(result);
        this.props.showSnack('Email sent.');
      })
      .catch((e) => {
        console.log(e);
        this.props.showSnack('Error! try again later');
      });
  };
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <hr style={{ borderTopColor: 'rgba(0,0,0,.1)' }} />
        </div>
        <div className="col-md-6 col-md-offset-3">
          <h3 className="title">Send Email</h3>
          <form onSubmit={e => this.sendEmail(e)}>
            <div className="form-group">
              <input type="text" className="form-control" name="subject" placeholder="Subject" />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Type message in here"
                name="message"
                className="form-control"
                rows="4"
              />
            </div>
            <div className="clearfix text-right">
              <Link to={`/Manager/User/${this.props.user._id}`} className="btn btn-simple btn-sm">
                Cancel
              </Link>
              <button className="btn btn-primary btn-sm" action="submit">
                Send Email
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const addStateToProps = state => ({
  authenticated: state.user.authenticated,
});

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({ showSnack }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
};
export default connect(addStateToProps, mapDispatch)(SendEmail);
