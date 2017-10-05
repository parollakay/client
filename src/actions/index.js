import axios from 'axios';
axios.defaults.withCredentials = true;
import { checkPassword } from '../utils';

const server = 'http://localhost:1804/'
const ENDPOINT = {
  USERS: `${SERVER}users/`,
  TERMS: `${SERVER}terms/`
};

export const USER_CREATED = 'USER_CREATED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_FORGOT_PASS = 'USER_FORGOT_PASS';
export const POST_RESET_PASS = 'POST_RESET_PASS';
export const USER_TERM_LIKE = 'USER_TERM_LIKE';
export const USER_TERM_UNLIKE = 'USER_TERM_UNLIKE';
export const AUTH_ERROR = 'AUTH_ERROR'

export const handleErr = (type, error) => {
  return {
    type,
    payload: error
  }
}

export const user_actions = {
  create: (username, email, password, confirmPassword, history) => {
    return (dispatch) => {
      checkPassword(password, confirmPassword)
        .then(() => {
          axios.post(`${ENDPOINT.USERS}new`, { email, username, password })
            .then((res) => {
              dispatch({
                type: USER_CREATED,
                payload: res.data
              });
              // history.push('/')
            }, err => dispatch(handleErr(AUTH_ERROR, err.data.message)))
        }, err => dispatch(handleErr(AUTH_ERROR, err)));
    }
  },
  signin: (username, password, ) => {
    return (dispatch) => {
      axios.post(`${ENDPOINT.USERS}auth`, {})
    }
  },
}