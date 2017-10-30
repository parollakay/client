import React from 'react';


const Engagement = props => {
  return (
    <div className="engamentWrapper">
      <ul>
        <li className="likesBtn hover">
          {props.renderVoting()}
        </li>
        <li className="sentsBtn hover" onClick={props.expand}>
          <button >
            <i className="fa fa-quote-right"></i>
          </button>
          {props.sentences.length} <span className="hidden-xs">Sentence{props.sentences.length > 1 && `s`}</span>
        </li>
        <li className="hover" onClick={props.showSharing}>
          <button >
            <i className="ion-android-share-alt"></i>
          </button>
          Share
        </li>
      </ul>
    </div>
  )
}


export default Engagement;