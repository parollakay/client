import React, { Component } from 'react';
import axios from 'axios';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './terms.css'
import Term from './Term/index'

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:1804/terms/all')
      .then(res => {
        this.setState({
          terms: res.data
        })
      }, err => {})
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
        {this.state.terms.map((term, i) => {
          return <Term term={term} key={i + 'term'} />
        })}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Terms
