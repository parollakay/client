import { handleErr, server, setLocalAuth, rmAuth, checkPassword } from '../utils';
import axios from 'axios';
import { DIALOG_CLOSE, SNACK_OPEN } from './';

export const USER_CREATED = 'USER_CREATED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_FORGOT_PASS = 'USER_FORGOT_PASS';
export const USER_RESET_PASS = 'USER_RESET_PASS';
export const USER_TERM_LIKE = 'USER_TERM_LIKE';
export const USER_TERM_UNLIKE = 'USER_TERM_UNLIKE';
export const USER_LOGOUT = 'USER_LOGOUT';
export const AUTH_ERROR = 'AUTH_ERROR';




export const register = (username, password, confirmPassword, email) => {
  console.log(`made it to actions with: ${username}, ${password}, ${confirmPassword}, ${email}`);
  return (dispatch) => {
    checkPassword(password, confirmPassword).then(() => {
      axios.post(`${server}/users/new`, { email, username, password })
        .then((res) => {
          dispatch({
            type: USER_CREATED,
            payload: res.data
          });
          dispatch({
            type: DIALOG_CLOSE
          });
          dispatch({
            type: SNACK_OPEN,
            payload: `Welcome ${res.data.user.username}, you are now signed in.`
          })
          // TODO: Make the server give me a token after registration.
          setLocalAuth(res.data.token, res.data.user._id);          
        }, err => err.data ? dispatch(handleErr(AUTH_ERROR, err.data.message)) : dispatch(handleErr(AUTH_ERROR, `Couldn't communicate with the server. Please try again later.`)))
    }, err => dispatch(handleErr(AUTH_ERROR, err)));
  }
};


export const signin = (username, password) => {
  axios.post(`${server}/users/auth`, { username, password }).then(res => {
    setLocalAuth(res.data.token, res.data.user._id);
    return {
      type: USER_AUTHENTICATED,
      payload: res.data
    }
  }, err => handleErr(AUTH_ERROR, err.data.message));
};

export const getToken = (email) => {
  return (dispatch) => {
    axios.post(`${server}/users/forgotPass`, { email }).then(res => {
      dispatch({
        type: USER_FORGOT_PASS,
        payload: res.data
      });
      // Tell user to go check their email
    }, err => dispatch(handleErr(AUTH_ERROR, err.data.message)));
  }
};

export const resetPass = (token, password) => {
  return (dispatch) => {
    axios.post(`${server}/users/resetPass`, { token, password }).then(res => {
      dispatch({
        type: USER_RESET_PASS,
        payload: res.data
      });
      // Force user to log in again
    }, err => handleErr(dispatch(AUTH_ERROR, err.data.message)));
  }
};

export const logout = () => {
  rmAuth();
  return (dispatch) => {
    dispatch({
      type: USER_LOGOUT
    })
  }
}

export const likeTerm = (userId, termId) => {
  return (dispatch) => {
    axios.post(`${server}/users/${userId}/addVote/${termId}`).then(res => {
      dispatch({
        type: USER_TERM_LIKE,
        payload: res.data
      });
      // Hide the like button, show the 'liked' button, show incremented number of likes.
    }, err => handleErr(AUTH_ERROR, err.data.message));
  }
  
};

export const unlikeTerm = (userId, termId) => {
  return (dispatch) => {
    axios.post(`${server}/users/${userId}/minusVote/${termId}`).then(res => {
      dispatch({
        type: USER_TERM_UNLIKE,
        payload: res.data
      });
      // Change like button to inactive, show decremented number of likes.
    }, err => handleErr(dispatch(AUTH_ERROR, err.data.message)));
  }
};
