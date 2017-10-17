import { handleErr, server } from '../utils';
import axios from 'axios';
import { SNACK_OPEN } from './';
export const TERMS_ALL = 'TERMS_ALL';
export const TERMS_SEARCH = 'TERMS_SEARCH';
export const TERMS_NEW = 'TERMS_NEW';
export const TERMS_ADD_SENTENCE = 'TERMS_ADD_SENTENCE';
export const TERMS_RM_SENTENCE = 'TEMRS_RM_SENTENCE';
export const TERMS_ERR = 'TERMS_ERR';

const backend = axios.create({
  baseURL: `${server}/terms`,
  headers: { 'x-access-token': localStorage.getItem('x-access-token')}
});


export const getTerms = () => {
  return (dispatch) => {
    axios.get(`${server}/terms/all`).then(res => {
      dispatch({
        type: TERMS_ALL,
        payload: res.data
      });
      // Do something, sort, or something before giving all terms to the client.
    }, err => handleErr(TERMS_ERR, err.data.message));
  }
};

export const searchTerm = (e, history) => {
  const term = e.target.term.value;
  const word = encodeURIComponent(term.trim()).toLocaleLowerCase();
  return (dispatch) => {
    axios.get(`${server}/terms/search?term=${word}`).then(res => {
      console.log(`Searched for ${word} and got.`, res.data);
      dispatch({
        type: TERMS_SEARCH,
        payload: res.data
      })
      // Send this to the store, replace search array with results.
      history.push('/search/');
    }, err => dispatch(handleErr(TERMS_ERR, err.data.message)));
  }
}

export const newTerm = (text, definition, sentences, author, tags, history) => {
  const authorized = localStorage.getItem('x-access-token');
  return (dispatch) => {
    if(!authorized) return dispatch(handleErr(TERMS_ERR, 'You must be authorized in order to add a term to the website.'));
    if(!text || !definition) return dispatch(TERMS_ERR, `You must fill out at least the term and the definition.`);
    backend.post(`/newTerm`, { text, definition, sentences, author, tags}).then(res => {
      dispatch({
        type: TERMS_NEW,
        payload: res.data
      });
      dispatch({
        type: SNACK_OPEN,
        payload: `Congrats: Your new term has been added!`
      });
      history.push('/');
    }, err => dispatch(handleErr(TERMS_ERR, err.response.data.message)));
  }
}

export const addSentence = ( termId, author, text, history) => {
  return (dispatch) => {
    backend.post(`/${termId}/sentence`, { author, text }).then(res => {
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
    }, err => dispatch(handleErr(TERMS_ERR, err.data.message)));
  }
};