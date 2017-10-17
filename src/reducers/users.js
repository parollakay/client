import {
  USER_AUTHENTICATED,
  USER_CREATED,
  USER_FORGOT_PASS,
  USER_LOGOUT,
  USER_RESET_PASS,
  AUTH_ERROR
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
    case USER_LOGOUT:
      return { ...user, authenticated: false, data: {} };
    case AUTH_ERROR:
      return { ...user, authenticated: false, data: {}, error: action.payload };
    default:
      return user;
  }
}