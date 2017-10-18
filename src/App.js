import React, { Component } from 'react';
import './App.css';
import './components/Sidebar/sidebar.css';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Route, withRouter } from 'react-router-dom'
import Header from './components/Header'
import { AuthDialog, TermsOfService, PrivacyStatement, DMCA } from './utils';
import Home from './components/Home';
import NewTerm from './components/NewTerm';
import { connect } from 'react-redux';
import { openDialog, hideSnack, autoAuth, getTerms } from './actions';
import Snackbar from 'material-ui/Snackbar';
import ResetPw from './components/ResetPw';
import NewPw from './components/NewPw';
import PageShell from './PageShell';


class App extends Component {

  closeSnack = () => {
    this.props.hideSnack();
  }

  componentDidMount() {
    this.props.autoAuth();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div className="App">
          <Header openAuth={this.props.openDialog} authenticated={this.props.authenticated}/>
          <div className="container-small container">
            <Route path="/" exact component={ Home } />
            
            <Route path="/resetPw" component={ PageShell(ResetPw) } />
            <Route path="/reset/:token" component={ PageShell(NewPw) } />

            <Route path="/newTerm" component={ PageShell(NewTerm) } />

            <Route path="/termsOfService" component={ PageShell(TermsOfService) } />
            <Route path="/privacyStatement" component={ PageShell(PrivacyStatement) } />
            <Route path="/DMCA" component={ PageShell(DMCA) } />
          </div>
          <Route component={AuthDialog} />
          <Snackbar
            open={this.props.auth.snack}
            message={this.props.auth.snackMessage}
            autoHideDuration={4000}
            onRequestClose={this.closeSnack} />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    authenticated: state.user.authenticated,
    terms: state.terms
  }
}


export default withRouter(connect(mapStateToProps, { openDialog, hideSnack, autoAuth, getTerms })(App));
