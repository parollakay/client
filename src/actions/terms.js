import { handleErr, server } from '../utils';
server.defaults.withCredentials = true;
server.interceptors.request.use(() => {
  server.defaults.headers.common['x-access-token'] = localStorage.getItem('x-access-token');
});

export const TERMS_ALL = 'TERMS_ALL';
export const TERMS_SEARCH = 'TERMS_SEARCH';
export const TERMS_NEW = 'TERMS_NEW';
export const TERMS_ADD_SENTENCE = 'TERMS_ADD_SENTENCE';
export const TERMS_RM_SENTENCE = 'TEMRS_RM_SENTENCE';
export const TERMS_ERR = 'TERMS_ERR';

export const getTerms = () => {
  return (dispatch) => {
    server.get('/terms/all').then(res => {
      dispatch({
        type: TERMS_ALL,
        payload: res.data
      });
      // Do something, sort, or something before giving all terms to the client.
    }, err => handleErr(TERMS_ERR, err.data.message));
  }
};

export const searchTerm = (term, history) => {
  const word = encodeURIComponent(term.trim()).toLocaleLowerCase();
  return (dispatch) => {
    server.get(`/terms/search?term=${word}`).then(res => {
      dispatch({
        type: TERMS_SEARCH,
        payload: res.data
      })
      // Send this to the store, replace search array with results.
      history.push('/search/');
    }, err => handleErr(dispatch(TERMS_ERR, err.data.message)));
  }
}

export const newTerm = (text, definition, sentences, author, tags, phonetic, history) => {
  const authorized = localStorage.getItem('x-access-token');
  return (dispatch) => {
    // Figure out a way to tell them that they should register before using this functionality.
    if(!authorized) return dispatch(handleErr(TERMS_ERR, 'You must be authorized in order to add a term to the website.'));
    server.post('/terms/newTerm', { text, definition, sentences, author, tags, phonetic, history}).then(res => {
      dispatch({
        type: TERMS_NEW,
        payload: res.data
      });
      // Do something, maybe redirect back to a page... but they must know that the word has been added.
    }, err => handleErr(dispatch(TERMS_ERR, err.data.message)));
  }
}

export const addSentence = ( termId, author, text, history) => {
  return (dispatch) => {
    server.post(`/terms/${termId}/sentence`, { author, text }).then(res => {
      dispatch({
        type: TERMS_ADD_SENTENCE,
        payload: res.data
      });
      // Make sure that the new sentence shows up under the term. Perhaps show an alert to confirm that it has been adde.d
    }, err => handleErr(dispatch(TERMS_ERR, err.data.message)));
  }
};

export const rmSentence = (termId, sentenceId, history) => {
  return (dispatch) => {
    server.delete(`/terms/${termId}/sentence/${sentenceId}`).then(res => {
      dispatch({
        type: TERMS_RM_SENTENCE,
        payload: res.data
      });
      // Make sure that the sentence has been removed from the store of.
    }, err => handleErr(dispatch(TERMS_ERR, err.data.message)));
  }
};