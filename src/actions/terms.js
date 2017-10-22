import { handleErr, server } from '../utils';
import axios from 'axios';
import { SNACK_OPEN, USER_UPDATED } from './';
export const TERMS_ALL = 'TERMS_ALL';
export const TERMS_SEARCH = 'TERMS_SEARCH';
export const TERMS_NEW = 'TERMS_NEW';
export const TERMS_ADD_SENTENCE = 'TERMS_ADD_SENTENCE';
export const TERMS_RM_SENTENCE = 'TEMRS_RM_SENTENCE';
export const TERMS_ERR = 'TERMS_ERR';
export const TERMS_NEW_PREVALUE = 'TERMS_NEW_PREVALUE';

axios.defaults.headers.common['x-access-token'] = localStorage.getItem('x-access-token');


export const termErr = (err) => dispatch => dispatch(handleErr(TERMS_ERR, err));

export const getTerms = () => {
  return (dispatch) => {
    axios.get(`${server}/terms/all`).then(res => {
      if (res.data.length < 1) return dispatch(handleErr(TERMS_ERR, `There are no terms to display. Nou pa gin mo pou'n montre'w!!`))
      dispatch({
        type: TERMS_ALL,
        payload: res.data
      });
      // Do something, sort, or something before giving all terms to the client.
    }, err => err.response ? dispatch(handleErr(TERMS_ERR, err.response.data.message)) : dispatch(handleErr(TERMS_ERR, 'Error displaying terms.')));
  }
};

export const searchTerm = (word) => {
  //console.log('trying to search', term);
  //const word = encodeURIComponent(term.trim()).toLocaleLowerCase();
  word = word.toLocaleLowerCase();
  return (dispatch) => {
    

    axios.get(`${server}/terms/search?term=${word}`).then(res => {
      console.log(`Searched for ${word} and got.`, res.data);
      dispatch({
        type: TERMS_SEARCH,
        payload: res.data
      });
    }, err => dispatch(handleErr(TERMS_ERR, err.response.data.message)));
  }
}

export const newTerm = (text, definition, sentences, author, tags, history) => {
  const authorized = localStorage.getItem('x-access-token');
  return (dispatch) => {
    if(!authorized) return dispatch(handleErr(TERMS_ERR, 'You must be authorized in order to add a term to the website.'));
    if(!text || !definition) return dispatch(handleErr(TERMS_ERR, `You must fill out at least the term and the definition.`));
      axios.post(`${server}/terms/newTerm`, { text, definition, sentences, author, tags}).then(res => {
      dispatch({
        type: TERMS_NEW,
        payload: res.data.defined
      });
      dispatch({
        type: SNACK_OPEN,
        payload: `Congrats: Your new term has been added!`
      });
      dispatch({
        type: USER_UPDATED,
        payload: res.data.user
      });
      history.push('/');
    }, err => err.response ? dispatch(handleErr(TERMS_ERR, err.response.data.message)) : dispatch(handleErr(TERMS_ERR, 'Server error saving this new term.')));
  }
}

export const changefieldValue = (value) => {
  return (dispatch) => {
    dispatch({
      type: TERMS_NEW_PREVALUE,
      payload: value
    });
  }
}

export const addSentence = ( termId, author, text, history) => {
  return (dispatch) => {
    axios.post(`${server}/terms/${termId}/sentence`, { author, text }).then(res => {
      console.log(res.data);
      dispatch({
        type: TERMS_ADD_SENTENCE,
        payload: res.data
      });
      dispatch({
        type: SNACK_OPEN,
        payload: `Congrats: New sentence added.`
      });
      // Make sure that the new sentence shows up under the term. Perhaps show an alert to confirm that it has been adde.d
    }, err => err.response ? dispatch({type: SNACK_OPEN, payload: err.response.data.message}) : dispatch({ type: SNACK_OPEN, payload: 'Error adding this sentence.'}));
  }
};

export const rmSentence = (termId, sentenceId, history) => {
  return (dispatch) => {
    axios.delete(`${server}/terms/${termId}/sentence/${sentenceId}`).then(res => {
      dispatch({
        type: TERMS_RM_SENTENCE,
        payload: res.data
      });
      // Make sure that the sentence has been removed from the store of.
    }, err => dispatch(handleErr(TERMS_ERR, err.response.data.message)));
  }
};