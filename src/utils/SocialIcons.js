import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout, openDialog } from '../actions'
import { Link } from 'react-router-dom';

class SocialIcons extends Component {r
  constructor(props) {
    super(props);
    this.state = {
      numClicks: 0,
    }
  }

  clickHandle = () => {
    if (this.state.numClicks > 0) {
      this.props.logout();
      this.setState({
        numClicks: 0,
        text: this.props.user.data.username
      });
    } else {
      this.setState({
        numClicks: 1,
        text: 'Log Out?'
      })
    }
  }

  render() {
    return (
      <div>
        <a href="http://instagram.com/parollakay" target="_blank" rel="noopener noreferrer" className="hidden-xs"><i className="fa fa-instagram"></i></a>
        <a href="http://facebook.com/parollakay" target="_blank" rel="noopener noreferrer" className="hidden-xs"><i className="fa fa-facebook"></i></a>
        <a href="http://twitter.com/parollakay" target="_blank" rel="noopener noreferrer" className="hidden-xs"><i className="fa fa-twitter"></i></a>
        {this.props.user.authenticated && <Link to="/myAccount" className="hover" title="My Account">
            <i className="fa fa-user"></i> &nbsp;<span className="hidden-xs">{this.props.user.data.username}</span> <span className="hidden-lg hidden-md hidden-sm">Account</span>
        </Link>}
        {!this.props.user.authenticated && <a className="hover" onClick={this.props.openDialog}> Log in</a>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    auth: state.auth
  }
}

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({ logout, openDialog }, dispatch);
  const allActionProps = { ...boundActionCreators, dispatch };
  return allActionProps;
}

export default connect(mapStateToProps, mapDispatch)(SocialIcons);