import React, { Component } from 'react';
import './App.css';
import './components/Sidebar/sidebar.css';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Route } from 'react-router-dom'
import Header from './components/Header'
import AddTerm from './components/Sidebar/AddTerm';
import { SocialIcons } from './utils';
import Terms from './components/Terms';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div className="App">
        <Header />
        <div className="container-small container">
          <div className="row">
            <div className="col-md-8">
              <Terms />
            </div>
            <div className="col-md-4">
              <AddTerm />
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
