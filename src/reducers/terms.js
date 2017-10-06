import { 
  TERMS_ADD_SENTENCE,
  TERMS_NEW,
  TERMS_ALL,
  TERMS_RM_SENTENCE,
  TERMS_SEARCH,
  USER_TERM_LIKE,
  USER_TERM_UNLIKE,
  TERMS_ERR
} from '../actions';

export default (terms = [], action) => {
  switch(action.type) {
    case TERMS_NEW:
      return terms.concat(action.payload);
    case TERMS_ALL:
      return action.payload;
    case TERMS_SEARCH:
      return action.payload;
    case TERMS_ADD_SENTENCE:
      return [ ...terms ];
    case TERMS_RM_SENTENCE:
      return [ ...terms ];
    case USER_TERM_LIKE:
      return [ ...terms ];
    case USER_TERM_UNLIKE:
      return [ ...terms ]
    case TERMS_ERR:
      return [ ...terms, { error: action.payload}];
    default:
      return terms;
  }
};