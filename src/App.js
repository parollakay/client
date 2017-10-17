import React, { Component } from 'react';
import './App.css';
import './components/Sidebar/sidebar.css';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Route } from 'react-router-dom'
import Header from './components/Header'
import { AuthDialog, TermsOfService, PrivacyStatement, DMCA } from './utils';
import Home from './components/Home';
import NewTerm from './components/NewTerm';
import { connect } from 'react-redux';
import { openDialog, hideSnack, autoAuth } from './actions';
import Snackbar from 'material-ui/Snackbar';
import ResetPw from './components/ResetPw';
import NewPw from './components/NewPw';


class App extends Component {

  closeSnack = () => {
    this.props.hideSnack();
  }

  componentDidMount() {
    this.props.autoAuth();
  }

  render() {
    console.log(this.props)
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div className="App">
        <Header openAuth={this.props.openDialog} authenticated={this.props.authenticated}/>
        <div className="container-small container">
          <Route path="/" exact component={ Home } />
          
          <Route path="/resetPw" component={ ResetPw } />
          <Route path="/reset/:token" component={ NewPw } />

          <Route path="/newTerm" component={ NewTerm } />

          <Route path="/termsOfService" component={ TermsOfService } />
          <Route path="/privacyStatement" component={ PrivacyStatement } />
          <Route path="/DMCA" component={ DMCA } />
        </div>
        <AuthDialog  />
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
    authenticated: state.user.authenticated
  }
}


export default connect(mapStateToProps, { openDialog, hideSnack, autoAuth })(App);
