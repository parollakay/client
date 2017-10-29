import React, { Component } from 'react';
import { connect } from 'react-redux'

class Engagement extends Component {

  renderVoting = () => {
    const likeBtn = ( <button onClick={this.props.like}> <i className="ion-android-favorite-outline"></i> {this.props.upvotes} Like{this.props.upvotes > 1 && 's'}</button> )
    const unlikeBtn = ( <button onClick={this.props.unlike} className="engLiked"> <i className="ion-android-favorite redColor"></i> {this.props.upvotes} Like{this.props.upvotes > 1 && 's'}</button> )
    let includes = false;
    if (!this.props.authenticated) return likeBtn;
    for (let i = 0; i < this.props.user.upvotes.length; i++) {
      if (this.props.user.upvotes[i]._id === this.props.term._id) {
        includes = true
      }
    }
    return includes ? unlikeBtn : likeBtn;
  }
  
  render() {
    return (
      <div className="engamentWrapper">
        <ul>
          <li className="likesBtn hover">
            {this.renderVoting()}
          </li>
          <li className="sentsBtn hover" onClick={this.props.expand}>
            <button >
              <i className="fa fa-quote-right"></i>
            </button>
            {this.props.sentences.length} <span className="hidden-xs">Sentence{this.props.sentences.length > 1 && `s`}</span>
          </li>
          <li className="hover" onClick={this.props.showSharing}>
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