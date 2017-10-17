import {
  DIALOG_CLOSE,
  DIALOG_OPEN,
  SNACK_CLOSE,
  SNACK_OPEN,
  openDialog,
  closeDialog,
  showSnack,
  hideSnack,
} from './auth';

import { 
  getTerms, 
  searchTerm, 
  newTerm, 
  addSentence, 
  rmSentence, 
  TERMS_ADD_SENTENCE,
  TERMS_ALL,
  TERMS_NEW,
  TERMS_RM_SENTENCE,
  TERMS_SEARCH,
  TERMS_ERR
} from './terms';

import {
  register,
  signin,
  getToken,
  resetPass,
  likeTerm,
  unlikeTerm,
  logout,
  USER_CREATED,
  USER_AUTHENTICATED,
  USER_FORGOT_PASS,
  USER_RESET_PASS,
  USER_TERM_LIKE,
  USER_TERM_UNLIKE,
  USER_LOGOUT,
  AUTH_ERROR,
  autoAuth
} from './user';

export {
  register,
  signin,
  getToken,
  resetPass,
  likeTerm,
  unlikeTerm,
  logout,
  USER_CREATED,
  USER_AUTHENTICATED,
  USER_FORGOT_PASS,
  USER_RESET_PASS,
  USER_TERM_LIKE,
  USER_TERM_UNLIKE,
  USER_LOGOUT,
  getTerms, 
  searchTerm, 
  newTerm, 
  addSentence, 
  rmSentence, 
  TERMS_ADD_SENTENCE,
  TERMS_ALL,
  TERMS_NEW,
  TERMS_RM_SENTENCE,
  TERMS_SEARCH,
  AUTH_ERROR,
  TERMS_ERR,
  DIALOG_CLOSE,
  DIALOG_OPEN,
  openDialog,
  closeDialog,
  SNACK_CLOSE,
  SNACK_OPEN,
  hideSnack,
  showSnack,
  autoAuth
}