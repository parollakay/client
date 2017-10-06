import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchTerm } from '../../actions';
import { SocialIcons } from '../../utils';

const MainNav = (props) => {
  return (
    <nav className="mainNav">
      <div className="pull-left">
        <Link to="/" exact >Home</Link>
        <Link to="/" >Browse</Link>
        <Link to="/addTerm">Add <i className="ion-plus"></i> </Link>
      </div>
      <div className="pull-right text-right">
        <SocialIcons />
      </div>
    </nav>
  )
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

const SignupText = (props) => <p className="suT">Want to join? <a>Login</a> or <a>Signup</a> in seconds.</p>

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