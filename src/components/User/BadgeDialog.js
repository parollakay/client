import React, { Component } from 'react';
import { hideBadgeModal } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';

class BadgeDialog extends Component {
  render() {
    const { badge } = this.props.auth
    return (
      <Dialog
        modal={false}
        open={this.props.auth.badgeOpen}
        onRequestClose={this.props.hideBadgeModal} >
        <div>
          {badge.name}, hey!
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
  const boundActionCreators = bindActionCreators({}, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}

export default connect(mapStateToProps, mapDispatch)(BadgeDialog);