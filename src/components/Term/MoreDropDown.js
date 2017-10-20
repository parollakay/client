import React, { Component } from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom';


class MoreDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleTouchTap(e) {
    e.preventDefault();
    this.setState({
      opened: true,
      anchorEl: e.currentTarget
    });
    
  };

  handleRequestClose() {
    this.setState({
      opened: false,
    })
  };

  render() {
    return (
      
      <div className="moreBtn">
        <button type="button" className="termMoreBtn" onClick={e => this.handleTouchTap(e)}>
          <i className="ion-more"></i>
        </button>
        <Popover
          open={this.state.opened}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem>
              <Link to={`/newTerm?text=${this.props.term.text}`}> Re-define term</Link>
            </MenuItem>
            <MenuItem primaryText="Report definition" />
            <MenuItem primaryText="Share" />
          </Menu>
        </Popover>
      </div>

    )
  }
}

export default MoreDropDown;