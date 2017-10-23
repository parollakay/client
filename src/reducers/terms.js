import { 
  TERMS_NEW,
  TERMS_ALL,
  TERMS_SEARCH,
  TERMS_ERR,
  TERMS_NEW_PREVALUE,
  TERMS_ERR_CLEAR
} from '../actions';

const defaultState = {
  data: [],
}

export default (terms = defaultState, action) => {
  switch(action.type) {
    case TERMS_NEW:
      return { data: [ action.payload, ...terms.data ] };
    case TERMS_ALL:
      return { data: [ ...action.payload ] };
    case TERMS_SEARCH:
      return { data: [ ...action.payload ] };
    case TERMS_NEW_PREVALUE:
      return { ...terms, prevalue: action.payload }
    case TERMS_ERR:
      return { ...terms,  error: action.payload };
    case TERMS_ERR_CLEAR:
      return { ...terms, error: null };
    default:
      return terms;
  }
};