import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom'
import Header from './components/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              Terms will go here
            </div>
            <div className="col-md-4">
              This will be the sidebar
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
