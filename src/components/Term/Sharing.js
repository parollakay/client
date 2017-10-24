import React from 'react';
import { ShareButtons } from 'react-share';

const { 
  FacebookShareButton,  
  EmailShareButton,
  TwitterShareButton,
  RedditShareButton
} = ShareButtons;

const Sharing = props => {
  
  
  return (
    <div className="sharingContainer">
      <ul>
        <li>
          <FacebookShareButton
            url={`http://parollakay.com/search?term=${props.term.text}`}
            quote={`Read The Definitions for ${props.term.text} on ParolLakay.com. ${props.term.definition}`}
            >
            <span className="sFB">
              <i className="fa fa-facebook-square"></i>
              <b>Facebook</b>
            </span>
          </FacebookShareButton>
        </li>
        <li>
          <TwitterShareButton
            url={`http://parollakay.com/search?term=${props.term.text}`}
            title={`Read The Definitions for ${props.term.text} on ParolLakay.com`}
            via={`@parollakay`}
            >
            <span className="sTw">
              <i className="fa fa-twitter-square"></i>
              <b>Twitter</b>
            </span>
          </TwitterShareButton>
        </li>
        <li>
          <RedditShareButton
            url={`http://parollakay.com/search?term=${props.term.text}`}
            title={`Read The Definitions for ${props.term.text} on ParolLakay.com.`}
            >
            <span className="sRd">
              <i className="fa fa-reddit-square"></i>
              <b>Reddit</b>
            </span>
          </RedditShareButton>
        </li>
        <li>
          <EmailShareButton
            url={`http://parollakay.com/search?term=${props.term.text}`}
            subject={`Read The Definitions for ${props.term.text} on ParolLakay.com. `}
            body={`${props.term.definition} - http://parollakay.com`}
            >
            <span className="sEm">
              <i className="fa fa-envelope"></i>
              <b>Email</b>
            </span>
          </EmailShareButton>
        </li>
        <li className="pull-right hover" onClick={props.cancel}>
          <span className="sSD">cancel</span>
        </li>
      </ul>
    </div>
  )
}

export default Sharing;