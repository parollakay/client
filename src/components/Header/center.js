import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import Popover from 'material-ui/Popover';
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
          <a onClick={e => this.handleTouchTap(e)} className="hover" >
            Browse &nbsp;&nbsp;<i className="ion-chevron-down"></i>
          </a>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            >
            <div className="browseMenu">
              <h6>Browse by letter</h6>
              {this.state.letters.map((letter, i) => <Link onClick={this.handleRequestClose} to={`/search?letter=${letter}`} key={`${letter}-letter`}>{letter}</Link>)}
            </div>
          </Popover>
          <Link to="/newTerm" className="hidden-xs topAddTermLink">Add Term<i className="ion-plus"></i> </Link>

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
    // this.props.searchTerm(e, this.props.history);
    this.props.history.push(`/search?term=${e.target.parolLakaySearch.value}`);
  }
  render() {
    return (
      <div className="searchInput">
        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="search" name="parolLakaySearch" placeholder="Type any word..." />
          <button className="searchIcon" action="submit">
            <i className="ion-search"></i>
          </button>
        </form>
      </div>
    )
  };
}


const SignupText = (props) => {
  const role = localStorage.getItem('x-user-role');
  return (
  <p className="suT">
    <strong className="hidden-lg hidden-md hidden-sm">Parol Lakay &nbsp;</strong>
    {!props.authenticated && <span>Want to join? <a className="hover" onClick={props.openAuth}>Sign up/Log in</a> in seconds.</span>}
    {props.authenticated && 
      <span>
        <Link to="/newTerm" className="topAddTermLink">Add Term <i className="ion-plus"></i> </Link>
        {(role === 'super' || role === 'admin') && <Link to="/Manager" className="topAddTermLink">Admin <i className="ion-gear-b"></i></Link>}
      </span>}
  </p>
)}

export {
  MainNav,
  Search,
  SignupText
}