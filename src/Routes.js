import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import QueryTerm from './components/QueryTerm';
import NewTerm from './components/NewTerm';
import ResetPw from './components/ResetPw';
import NewPw from './components/NewPw';
import PageShell from './PageShell';
import TagTerms from './components/TagTerms';
import AccountPage from './components/User';

import {TermsOfService, PrivacyStatement, DMCA } from './utils';

const Routes = props => {
  return (
    <div className="container-small container">
      <Route path="/" exact component={ Home } />
      <Route path="/search" component={ QueryTerm } />
      <Route path="/tag" component={ TagTerms } />

      <Route path="/myAccount" render={PageShell(() => <AccountPage openAuth={props.openAuth} history={props.history} />)} />
      
      <Route path="/resetPw" component={ PageShell(ResetPw) } />
      <Route path="/reset/:token" component={ PageShell(NewPw) } />

      <Route path="/newTerm" component={ PageShell(NewTerm) } />

      <Route path="/termsOfService" component={ PageShell(TermsOfService) } />
      <Route path="/privacyStatement" component={ PageShell(PrivacyStatement) } />
      <Route path="/DMCA" component={ PageShell(DMCA) } />
    </div>
  )
}

export default withRouter(Routes);