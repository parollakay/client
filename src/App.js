import React, { Component } from 'react';
import './App.css';
import './components/Sidebar/sidebar.css';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { withRouter } from 'react-router-dom'
import Header from './components/Header'
import { AuthDialog } from './utils';
import BadgeDialog from './components/User/BadgeDialog';
import { connect } from 'react-redux';
import { openDialog, hideSnack, autoAuth, getTerms } from './actions';
import Snackbar from 'material-ui/Snackbar';

import Routes from './Routes';


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
          <Header openAuth={this.props.openDialog} authenticated={this.props.authenticated} history={this.props.history}/>
          <Routes authenticated={this.props.authenticated} openAuth={this.props.openDialog} />
          <AuthDialog />
          <BadgeDialog />
          <Snackbar open={this.props.auth.snack} message={this.props.auth.snackMessage} autoHideDuration={4000} onRequestClose={this.closeSnack} />
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
