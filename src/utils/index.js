import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthDialog from './AuthDialog';
import { TermsOfService } from './TermsOfService';
import { PrivacyStatement } from './PrivacyStatement';
import { DMCA } from './DMCA'
import SocialIcons from './SocialIcons';

export const server = 'http://localhost:1804';

export const checkPassword = (password, confirmPass) => {
  console.log(password, confirmPass);
  return new Promise((resolve, reject) => {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    console.log(re.test(password));
    if (re.test(password)) {
      if (password !== confirmPass) {
        reject('Both passwords must match.')
      } else {
        resolve();
      }
    } else {
      reject('The password you entered is not valid. Passwords must contain all of the following: 6 characters or more, one number, one lowercase and one uppercase letter.');
    }
  });
}

export const handleErr = (type, error) => {
  console.log(type, error);
  return {
    type,
    payload: error
  }
}

export const setLocalAuth = (token, userId) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem('x-access-token', token);
    localStorage.setItem('x-user-id', userId);
    resolve();
  });
  
}

export const rmAuth = () => {
  return new Promise((resolve, reject) => {
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-user-id');
    resolve();
  });
  
}


export class FacebookPagePlugin extends Component  {
  componentDidMount() {
    
    window.fbAsyncInit = function() {
      window.FB.init({
        appId            : '127965247924981',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.10'
      });
      document.dispatchEvent(new Event('fb_init'));
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    document.addEventListener('fb_init', e => window.FB.XFBML.parse());
  }
  render () {
    return (
      <div 
        className="fb-page" 
        data-href="https://www.facebook.com/parollakay" 
        data-small-header="true" 
        data-adapt-container-width="true"
        data-width="253"
        data-hide-cover="false" 
        data-show-facepile="true">
        <blockquote 
          cite="https://www.facebook.com/parollakay" 
          className="fb-xfbml-parse-ignore">
          <a href="https://www.facebook.com/parollakay">Parol Lakay</a>
        </blockquote>
      </div>
    )
  }
}

export const FooterText = (props) => {
  return (
    <div className="footerText">
      <p>
        &copy; 2017 <strong>Parol Lakay</strong><br />
        <Link to="/termsOfService">terms of service</Link>
        <Link to="/privacyStatement">privacy</Link>
        <Link to="/DMCA">dmca</Link>
      </p>
    </div>
  )
}

export const StaticLinks = () => {
  return (
    <ul className="staticLinks">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/termsOfService">terms of service</Link></li>
      <li><Link to="/privacyStatement">privacy</Link></li>
      <li><Link to="/DMCA">dmca</Link></li>
    </ul>
  )
}

export { 
  AuthDialog,
  TermsOfService,
  PrivacyStatement,
  DMCA,
  SocialIcons
 }