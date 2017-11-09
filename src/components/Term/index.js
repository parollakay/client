import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import MoreDropDown from './MoreDropDown'
import Engagement from './Engagement';
import Sharing from './Sharing';
import Sentences from './Sentences';
import SentenceInput from './SentenceInput';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { server, titleCase } from '../../utils';
import { likeTerm, unlikeTerm, showSnack, openDialog, updateUser, openDrawer } from '../../actions'
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
      showAllSentences: false,
      showSharing: false,
      savedTerm: false
     }
  }

  expanSentences = () => {
    this.setState({
      showAllSentences: true
    });
    console.log(this.state.term);
  }

  exposeSharing = () => this.setState({ showSharing: true});
  hideSharing = () => this.setState({ showSharing: false });

  saveTerm = () => {
    this.checkAuth().then(() => {
      axios.post(`${server}/users/${this.props.user._id}/saveTerm`, { term: this.props.term._id }).then(res => {
        this.props.updateUser(res.data);
        this.props.showSnack('Term saved');
        this.props.openDrawer('b');
      }, e => e.response ? this.setState({ termErr: e.response.data.message }) : this.setState({ termErr: 'Error: try again later.'}));
    });
  }

  checkAuth = () => {
    return new Promise((resolve, reject) => {
      if (!this.props.authenticated) {
        if (localStorage.getItem('x-access-token')) {
          this.setState({
            termErr: `Please refresh your browser first.`,
            authErr: true
          })
        } else {
          this.setState({
            termErr: `You must be authenticated to do that.`,
            authErr: true
          });
        }
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
        this.setState({
          term: res.data,
          showAllSentences: true,
          termErr: null
        });
        this.props.showSnack('Example added.');
      }, err => err.response ? this.setState({ termErr: err.response.data.message }) : this.setState({ termErr: 'Error adding sentence. try later.'}))
    })
  }

  clearErr = () => this.setState({ termErr: null, authErr: null });

  renderAlert = () => {
    if(!this.state.termErr) return null;
    return (
      <div className="text-danger hover" onClick={this.clearErr}>
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;&nbsp;
        <span className="sr-only">Error:</span>
        {this.state.termErr}:{this.state.authErr && <a className="hover" onClick={this.props.openDialog}>Login</a>}
      </div>
    )
  } 

  addVote = () => {
    this.checkAuth().then(() => {
      axios.post(`${server}/users/${this.props.user._id}/addVote/${this.props.termId}`).then(res => {
        console.log(res.data.term);
        this.setState({
          term: res.data.term,
          termErr: null
        });
        this.props.likeTerm(res.data.user);
        console.log(this.state.term.upvotes);
      }, err => err.response ? this.setState({ termErr: err.response.data.message }) : this.setState({ termErr: 'Error liking term. try later.'}));
    });    
  }

  minusVote = () => {
    console.log('clicked to unlike')
    this.checkAuth().then(() => {
      axios.post(`${server}/users/${this.props.user._id}/minusVote/${this.props.termId}`).then(res => {
        console.log(res.data.user);
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
    //const term = this.props.terms.filter(term => term._id === this.props.termId)[0];
    this.setState({
      term: this.props.term,
      termErr: null
    })
    
  }


  renderSaved = () => {
    if (!this.props.authenticated) return null;
    let includes = false;
    for (let i = 0; i < this.props.savedTerms.length; i++) {
      if (this.props.savedTerms[i].term._id == this.props.termId) {
        includes = true;
      }
    }
    return includes ?  <TermBadge text="Saved" type="badge-info" /> : null
  }

  renderVoting = () => {
    const likeBtn = ( <button onClick={this.addVote}> <i className="ion-android-favorite-outline"></i> {this.state.term.upvotes} Like{this.state.term.upvotes > 1 && 's'}</button> )
    const unlikeBtn = ( <button onClick={this.minusVote} className="engLiked"> <i className="ion-android-favorite redColor"></i> {this.state.term.upvotes} Like{this.state.term.upvotes > 1 && 's'}</button> )
    let includes = false;
    if (!this.props.authenticated) return likeBtn;
    for (let i = 0; i < this.props.user.upvotes.length; i++) {
      if (this.props.user.upvotes[i]._id === this.state.term._id) {
        includes = true
      }
    }
    return includes ? unlikeBtn : likeBtn;
  }

  render() {
    console.log(this.state.term, this.props.terms)  
    if (!this.state.term) return null;
    if (!this.state.term.live) return null;
    return (
      <Paper className="eachTerm" style={cardStyle} zDepth={2}>
        <div className="badgesHolder">
          {(this.props.index < 1 && this.props.length > 1) && <TermBadge text="Top Definition" type="highlight"/>}
          {this.renderSaved()}
        </div>
        <Link to={`/search?term=${this.state.term.text}`}><h3> {titleCase(this.state.term.text)}</h3></Link>
        <MoreDropDown 
          term={this.state.term} 
          reportTerm={this.reportTerm} 
          sharing={this.exposeSharing}
          saveTerm={this.saveTerm}/>
        <p className="termMeta" title={'Submitted ' + moment(this.state.term.created).format("MMM Do YYYY")}>
          by <strong>{this.state.term.author.username} · </strong> 
          {this.state.term.author.achievements.length > 0 && <span><i className="ion-ribbon-b"></i> {this.state.term.author.achievements[this.state.term.author.achievements.length - 1].name}  · </span>}
          {moment(this.state.term.created).fromNow()}
        </p>
        <p className="termDefinition">{this.state.term.definition}</p>
        <ul className="termsTags"> {this.state.term.tags.map((tag, i) => <li key={i} className="hover"><Link to={`/tag?tag=${tag}`}> #{tag} </Link></li> )} </ul>
        {this.renderAlert()}
        <Engagement
          renderVoting={this.renderVoting}
          like={this.addVote}
          unlike = {this.minusVote}
          upvotes={this.state.term.upvotes} 
          sentences={this.state.term.sentences}
          expand={this.expanSentences} 
          term={this.state.term}
          showSharing={this.exposeSharing}
          hideSharing={this.hideSharing}
          />
        {this.state.showSharing && <Sharing term={this.state.term} cancel={this.hideSharing}/>}
        {this.state.term.sentences.length > 0 && <Sentences sentences={this.state.term.sentences} termId={this.state.term._id} showAll={this.state.showAllSentences} expand={this.expanSentences}/>}      
        <SentenceInput term={this.props.termId} addSentence={this.addSentence} text={this.state.term.text}/>
      </Paper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    terms: state.terms.data,
    user: state.user.data,
    savedTerms: state.user.data.savedTerms,
    authenticated: state.user.authenticated
  }
}

const mapDispatch = (dispatch) => {
  const boundActionCreators = bindActionCreators({ likeTerm, unlikeTerm, showSnack, openDialog, updateUser, openDrawer }, dispatch);
  const allActionCreators = { ...boundActionCreators, dispatch };
  return allActionCreators;
}
export default connect(mapStateToProps, mapDispatch)(Term);