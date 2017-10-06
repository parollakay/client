import {
  USER_AUTHENTICATED,
  USER_CREATED,
  USER_FORGOT_PASS,
  USER_LOGOUT,
  USER_RESET_PASS,
  AUTH_ERROR
} from '../actions'

export default (user = {}, action) => {
  switch(action.type) {
    case USER_AUTHENTICATED:
      return action.payload;
    case USER_CREATED:
      return action.payload;
    case USER_FORGOT_PASS:
      return { ...user };
    case USER_RESET_PASS:
      return { ...user };
    case USER_LOGOUT:
      return {};
    case AUTH_ERROR:
      return { ...user, error: action.payload };
    default:
      return user;
  }
}