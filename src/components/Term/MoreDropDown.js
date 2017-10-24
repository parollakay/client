import React, { Component } from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom';


class MoreDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      reportClick: 0,
      reportText: 'Report Term'
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

  checkReport = () => {
    if (this.state.reportClick < 1) {
      this.setState({
        reportClick: this.state.reportClick + 1,
        reportText: 'Are You Sure?'
      })
    } else {
      this.props.reportTerm();
      this.setState({
        reportText: 'Reported',
        opened: false
      })
    }
  }
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
          <Menu >
            <MenuItem>
              <Link to={`/newTerm?text=${this.props.term.text}`} className="termdd icon-first"> 
                <i className="glyphicon glyphicon-pencil"></i> Re-define term
              </Link>
            </MenuItem>
            <MenuItem onClick={this.checkReport} className="termdd">
              <a className="icon-first">
                <i className="glyphicon glyphicon-flag"></i> {this.state.reportText}
              </a>
            </MenuItem>
            <MenuItem onClick={this.props.sharing}>
              <span className="icon-first"><i className="ion-android-share-alt"></i> Share</span>
            </MenuItem>
          </Menu>
        </Popover>
      </div>

    )
  }
}

export default MoreDropDown;