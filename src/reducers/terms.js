import { 
  TERMS_NEW,
  TERMS_ALL,
  TERMS_SEARCH,
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
    case TERMS_ERR:
      return { ...terms,  error: action.payload };
    default:
      return terms;
  }
};