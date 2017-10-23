import React, { Component } from 'react';
import { hideBadgeModal } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';


const badgeStyle = {
  background: '#004588',
  background: '-moz-linear-gradient(top,  #004588 0%, #1981d6 50%, #2989d8 50%, #ef6b6b 51%, #a70c10 52%, #8f0a0d 100%)',
  background: '-webkit-linear-gradient(top,  #004588 0%,#1981d6 50%,#2989d8 50%,#ef6b6b 51%,#a70c10 52%,#8f0a0d 100%)',
  background: 'linear-gradient(to bottom,  #004588 0%,#1981d6 50%,#2989d8 50%,#ef6b6b 51%,#a70c10 52%,#8f0a0d 100%)',
  filter: `progid:DXImageTransform.Microsoft.gradient( startColorstr='#004588', endColorstr='#8f0a0d',GradientType=0 )`,
  position: 'relative',
  padding:'5%'
}
class BadgeDialog extends Component {

  closeDialog = () => {
    this.props.hideBadgeModal();
  }

  render() {
    const { badge } = this.props.auth;
    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        onClick={this.closeDialog} />
    ]
    if (!badge) return null;
    return (
      <Dialog
        actions={actions}
        contentStyle={badgeStyle}
        modal={false}
        open={this.props.auth.badgeOpen}
        onRequestClose={this.closeDialog} >
        <div className="bdContent">
          <h2 className="icon-first"><i className="ion-ribbon-b"></i>Achievement Unlocked!</h2>
          <p className="lead">{badge.description}</p>
          <p>You have now earned the new title <strong><i className="ion-ribbon-b"></i> {badge.name}</strong></p>
          <p>A badge with your new title will appear next to your username from now on. Keep it up! You can view all your achievements in <Link to="/myAccount">the account page</Link>.</p>
        </div>
      </Dialog>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatch = dispatch => {
  const boundActionCreators = bindActionCreators({ hideBadgeModal }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}

export default connect(mapStateToProps, mapDispatch)(BadgeDialog);