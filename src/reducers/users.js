import {
  USER_AUTHENTICATED,
  USER_CREATED,
  USER_FORGOT_PASS,
  USER_LOGOUT,
  USER_RESET_PASS,
  USER_TERM_LIKE,
  USER_TERM_UNLIKE,
  USER_UPDATED,
  AUTH_ERROR,
  USER_ERR_CLEAR,
} from '../actions'

const defaultState = {
  data: {},
  authenticated: false
}

export default (user = defaultState, action) => {
  switch(action.type) {
    case USER_AUTHENTICATED:
      return { ...user, authenticated: true, data: action.payload };
    case USER_CREATED:
      return { ...user, authenticated: true, data: action.payload };
    case USER_FORGOT_PASS:
      return { ...user, authenticated: false, data: {} };
    case USER_RESET_PASS:
      return { ...user, authenticated: false, data: {} };
    case USER_UPDATED:
      return { ...user, authenticated: true, data: action.payload };
    case USER_LOGOUT:
      return { ...user, authenticated: false, data: {} };
    case USER_TERM_LIKE:
      return { ...user, data: action.payload };
    case USER_TERM_UNLIKE:
      return { ...user, data: action.payload };
    case AUTH_ERROR:
      return { ...user, authenticated: false, data: {}, error: action.payload };
    case USER_ERR_CLEAR:
      return { ...user, error: null };
    default:
      return user;
  }
}