import React, { Component } from 'react';
import Popover from 'material-ui/Popover';
import { ShareButtons, generateShareIcon } from 'react-share';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem'

const { FacebookShareButton, GooglePlusShareButton, TwitterShareButton, EmailShareButton } = ShareButtons;

class Engagement extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      term: props.term,
      definition: props.definition,
      likes: props.upvotes,
      sentences: props.sentences
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
  componentDidMount() {}

  render() {
    return (
      <div className="engamentWrapper">
        <ul>
          <li className="likesBtn hover">
            <button >
              <i className="ion-android-favorite-outline"></i>
            </button>
            {this.state.likes} Like{this.state.likes > 1 && 's'}
          </li>
          <li className="sentsBtn">
            <button >
              <i className="ion-ios-chatboxes-outline"></i>
            </button>
            {this.state.sentences.length} Sentence{this.state.sentences.length > 1 && `s`}
          </li>
          <li className="hover" onClick={e => this.handleTouchTap(e)}>
            <button >
              <i className="ion-android-share-alt"></i>
            </button>
            Share
          </li>
          <Popover
            open={this.state.opened}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem><FacebookShareButton title={this.state.term} description={this.state.definition}>Share to facebook</FacebookShareButton></MenuItem>
              <MenuItem 
                leftIcon={<i className="fa fa-facebook"></i>}
                primaryText="Facebook" />
              <MenuItem 
                leftIcon={<i className="fa fa-twitter"></i>}
                primaryText="Twitter"  />
            </Menu>
          </Popover>
        </ul>
      </div>
    )
  }
}

export default Engagement;