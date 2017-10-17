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

const defaultState = {
  data: [],
}

export default (terms = defaultState, action) => {
  switch(action.type) {
    case TERMS_NEW:
      return { ...terms, data: [ ...terms.data, action.payload]};
    case TERMS_ALL:
      return { ...terms, data: action.payload };
    case TERMS_SEARCH:
      return { ...terms, data: action.payload };
    case TERMS_ADD_SENTENCE:
      console.log('sentence added', action.payload, terms.data)
      const oldTerms1 = [ ...terms.data ]
      console.log(oldTerms1);
      for (let i = 0; i < terms.data.length; i++) {
        if (oldTerms1[i]._id === action.payload._id) {
          oldTerms1[i] = action.payload;
          console.log(oldTerms1[i]._id, action.payload._id);
        }
      }
      return { ...terms, data: oldTerms1 };
    case TERMS_RM_SENTENCE:
      const oldTerms2 = [ ...terms.data ]
      for (let i = 0; i < oldTerms2.length; i++) {
        if (oldTerms2[i]._id === action.payload._id) {
          oldTerms2[i] = action.payload
        }
      }
      return { ...terms, data: oldTerms2 };
    case USER_TERM_LIKE:
      const oldTerms3 = [ ...terms.data ]
      for (let i = 0; i < oldTerms3.length; i++) {
        if (oldTerms3[i]._id === action.payload._id) {
          oldTerms3[i] = action.payload
        }
      }
      return { ...terms, data: oldTerms3 };
    case USER_TERM_UNLIKE:
      const oldTerms4 = [ ...terms.data ]
      for (let i = 0; i < oldTerms4.length; i++) {
        if (oldTerms4[i]._id === action.payload._id) {
          oldTerms4[i] = action.payload
        }
      }
      return { ...terms, data: oldTerms4 };
    case TERMS_ERR:
      return { ...terms,  error: action.payload };
    default:
      return terms;
  }
};