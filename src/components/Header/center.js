import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Popover from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';
import { searchTerm } from '../../actions';
import { SocialIcons } from '../../utils';

class MainNav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    }
    this.handleTouchTap = this.handleTouchTap.bind(this)
  }
  handleTouchTap = (e) => {
    console.log('u tapped', e)
    e.preventDefault();
    this.setState({
      open: true,
      anchorEl: e.currentTarget
    });
    
  }
  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }
  render() {
    return (
      <nav className="mainNav">
        <div className="pull-left">
          <Link to="/">Home</Link>
          <a onClick={e => this.handleTouchTap(e)} >
            Browse &nbsp;&nbsp;<i className="ion-chevron-down"></i>
          </a>
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
            >
              <div className="row browseMenu" >
                {this.state.letters.map((letter, i) => {
                  return (
                    <div className="mItem" key={`${letter}-letter`}>
                      <FlatButton label={letter} secondary={true} />
                    </div>
                  )
                })}
              </div>
              
            </Popover>

          <Link to="/newTerm">Add <i className="ion-plus"></i> </Link>
        </div>
        <div className="pull-right text-right">
          <SocialIcons />
        </div>
      </nav>
    )
  }
}

class Search extends Component {
  constructor (props) {
    super(props);
    this.state = { }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.searchTerm(e, this.props.history);
  }
  render() {
    return (
      <div className="searchInput">
        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="search" name="parolLakaySearch" placeholder="Type any word..." />
          <button className="searchIcon" type="submit">
            <i className="ion-search"></i>
          </button>
          <button className="addIcon" type="button">
            <i className="ion-plus"></i>
          </button>
        </form>
      </div>
    )
  };
}

const SignupText = (props) => {
  return (
    
  <p className="suT">
    {!props.authenticated && <span>Want to join? <a className="hover" onClick={props.openAuth}>Sign up/Log in</a> in seconds.</span>}
    {props.authenticated && <span>The Haitian Dictionary created by you.</span>}
  </p>
)}

const mapStateToProps = (state) => {
  return {
    terms: state.terms
  }
}

Search = connect(mapStateToProps, { searchTerm})(Search)
export {
  MainNav,
  Search,
  SignupText
}