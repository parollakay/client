import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import MoreDropDown from './MoreDropDown'
import Engagement from './Engagement';
import Sentences from './Sentences';
import SentenceInput from './SentenceInput';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { server, titleCase } from '../../utils';
import { likeTerm, unlikeTerm, showSnack } from '../../actions'
import axios from 'axios';
import { Link } from 'react-router-dom';
import TermBadge from './Badge';
axios.defaults.headers.common['x-access-token'] = localStorage.getItem('x-access-token');

const cardStyle = {
  borderRadius: '4px',
  width: '100%',
  padding: '15px'
};

class Term extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      showAllSentences: false
     }
  }

  expanSentences = () => {
    this.setState({
      showAllSentences: true
    });
  }

  checkAuth = () => {
    return new Promise((resolve, reject) => {
      if (!this.props.authenticated) {
        this.setState({
          termErr: 'You must be authenticated to do that.'
        });
        reject();
      } else {
        resolve();
      }
    })
  }

  addSentence = (text) => {
    this.checkAuth().then(() => {
      const body = {
        text,
        author: this.props.user._id
      }
      axios.post(`${server}/terms/${this.props.termId}/sentence`, body).then(res => {
        console.log(res);
        this.setState({
          term: res.data,
          showAllSentences: true,
          termErr: null
        });
        this.props.showSnack('Example added.');
      }, err => err.response ? this.setState({ termErr: err.response.data.message }) : this.setState({ termErr: 'Error adding sentence. try later.'}))
    })
  }

  renderAlert = () => {
    if(!this.state.termErr) return null;
    return (
      <div className="text-danger">
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;&nbsp;
        <span className="sr-only">Error:</span>
        {this.state.termErr}
      </div>
    )
  } 

  addVote = () => {
    this.checkAuth().then(() => {
      if (this.props.user.upvotes.includes(this.props.termId)) return;
      axios.post(`${server}/users/${this.props.user._id}/addVote/${this.props.termId}`).then(res => {
        this.setState({
          term: res.data.term,
          termErr: null
        });
        this.props.likeTerm(res.data.user);
      }, err => err.response ? this.setState({ termErr: err.response.data.message }) : this.setState({ termErr: 'Error liking term. try later.'}));
    });    
  }

  minusVote = () => {
    this.checkAuth().then(() => {
      if (!this.props.user.upvotes.includes(this.props.termId)) return;
      axios.post(`${server}/users/${this.props.user._id}/minusVote/${this.props.termId}`).then(res => {
        this.setState({
          term: res.data.term,
          termErr: null
        });
        this.props.unlikeTerm(res.data.user);
      }, err => err.response ? this.setState({ termErr: err.response.data.message }) : this.setState({ termErr: 'Application error, try later.'}))
    });
  }

  reportTerm = () => {
    this.checkAuth().then(() => {
      if (this.props.term.incidences.includes(this.props.user._id)) return this.setState({ termErr: 'You already snitched on this one.'});
      const body = {
        user: this.props.user._id
      }
      axios.post(`${server}/terms/${this.props.termId}/reportTerm`, body).then(res => {
        this.setState({
          term: res.data,
          termErr: null
        });
        this.props.showSnack('Term has been reported. Thank you for snitching.')
      }, err => err.response ? this.setState({ termErr: err.response.data.message }) : this.setState({ termErr: 'Application error, try later.'}));
    })
  }
  componentDidMount() {    
    const term = this.props.terms.filter(term => term._id === this.props.termId)[0];
    this.setState({
      term,
      termErr: null
    })
    
  }

  render() {
    const term = this.state.term || this.props.term;
    return (
      <Paper className="eachTerm" style={cardStyle} zDepth={2}>
        <div className="badgesHolder">
          {(this.props.index < 1 && this.props.length > 1) && <TermBadge text="Top Definition" type="highlight"/>}
        </div>
        <Link to={`/search?term=${term.text}`}><h3> {titleCase(term.text)}</h3></Link>
        <MoreDropDown term={term} reportTerm={this.reportTerm}/>
        <p className="termMeta" title={'Submitted ' + moment(term.created).format("MMM Do YYYY")}>
          by <strong>{term.author.username} · </strong> 
          {term.author.achievements.length > 0 && <span><i className="ion-ribbon-b"></i> {term.author.achievements[term.author.achievements.length - 1].name}  · </span>}
          {moment(term.created).fromNow()}
        </p>
        <p className="termDefinition">{term.definition}</p>
        <ul className="termsTags"> {term.tags.map((tag, i) => <li key={i} className="hover"><Link to={`/tag?tag=${tag}`}> #{tag} </Link></li> )} </ul>
        {this.renderAlert()}
        <Engagement
          like={this.addVote}
          unlike = {this.minusVote}
          upvotes={term.upvotes} 
          sentences={term.sentences}
          expand={this.expanSentences} 
          term={term}/>
        {term.sentences.length > 0 && <Sentences sentences={term.sentences} termId={term._id} showAll={this.state.showAllSentences} expand={this.expanSentences}/>}      
        <SentenceInput term={this.props.termId} addSentence={this.addSentence} />
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    terms: state.terms.data,
    user: state.user.data,
    authenticated: state.user.authenticated
  }
}

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({ likeTerm, unlikeTerm, showSnack }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}
export default connect(mapStateToProps, mapDispatch)(Term);