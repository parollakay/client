import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import termsReducer from './terms';
import userReducer from './users';

const rootReducer = combineReducers({
  user: userReducer,
  terms: termsReducer,
  form: formReducer
})

export default rootReducer;