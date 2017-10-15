import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import TermsReducer from './terms';
import UserReducer from './users';
import AuthReducer from './auth';

const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  terms: TermsReducer,
  form: FormReducer
})

export default rootReducer;