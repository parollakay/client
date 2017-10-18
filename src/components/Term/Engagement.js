import React, { Component } from 'react';
import { connect } from 'react-redux'

class Engagement extends Component {

  renderVoting = () => {
    const likeBtn = ( <button onClick={this.props.like}> <i className="ion-android-favorite-outline"></i> {this.props.upvotes} Like{this.props.upvotes > 1 && 's'}</button> )
    const unlikeBtn = ( <button onClick={this.props.unlike}> <i className="ion-android-favorite redColor"></i> {this.props.upvotes} Like{this.props.upvotes > 1 && 's'}</button> )
    
    if (!this.props.authenticated) return likeBtn;
    if (this.props.user.upvotes.includes(this.props.term._id)) {
      return unlikeBtn;
    } else {
      return likeBtn;
    }
  }
  
  render() {
    console.log(this.props.user);
    return (
      <div className="engamentWrapper">
        <ul>
          <li className="likesBtn hover">
            {this.renderVoting()}
            
          </li>
          <li className="sentsBtn">
            <button >
              <i className="ion-ios-chatboxes-outline"></i>
            </button>
            {this.props.sentences.length} Sentence{this.props.sentences.length > 1 && `s`}
          </li>
          <li className="hover">
            <button >
              <i className="ion-android-share-alt"></i>
            </button>
            Share
          </li>
        </ul>
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

export default connect(mapStateToProps)(Engagement);