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
export const USER_UPDATED = 'USER_UPDATED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const USER_ERR_CLEAR = 'USER_ERR_CLEAR';

export const clearUserErr = () => dispatch => dispatch({ type: USER_ERR_CLEAR });
export const addUserErr = error => dispatch => dispatch(handleErr(AUTH_ERROR, error));

export const autoAuth = () => {
  const token = localStorage.getItem('x-access-token');
  const userId = localStorage.getItem('x-user-id');
  const options = {
    method: 'GET',
    url: `${server}/users/${userId}/autoAuth`,
    headers: {
      'x-access-token': token
    },
    json: true
  }
  return (dispatch) => {
    if (!token || !userId) return;
    axios(options).then(res => {
      dispatch({
        type: USER_AUTHENTICATED,
        payload: res.data
      });
      dispatch({
        type: SNACK_OPEN,
        payload: `Welcome back ${res.data.username}.`
      });
    }, err => err.response ? dispatch(handleErr(AUTH_ERROR, err.response.data.message)) : dispatch(handleErr(AUTH_ERROR, `Couldn't communicate with the server. Please try again later.`)))
  }
}

export const register = (username, password, confirmPassword, email) => {
  return (dispatch) => {
    checkPassword(password, confirmPassword).then(() => {
      axios.post(`${server}/users/new`, { email, username, password })
        .then((res) => {
          dispatch({
            type: USER_CREATED,
            payload: res.data.user
          });
          setLocalAuth(res.data.token, res.data.user._id).then(() => {
            dispatch({
              type: DIALOG_CLOSE
            });
            dispatch({
              type: SNACK_OPEN,
              payload: `Welcome ${res.data.user.username}, you are now signed in.`
            });
          })      
        }, err => err.response ? dispatch(handleErr(AUTH_ERROR, err.response.data.message)) : dispatch(handleErr(AUTH_ERROR, `Couldn't communicate with the server. Please try again later.`)))
    }, err => dispatch(handleErr(AUTH_ERROR, err)));
  }
};

export const updateUser = (payload) => {
  return (dispatch) => {
    dispatch({
      type: USER_UPDATED,
      payload,
    })
  }
}
export const signin = (username, password) => {
  return (dispatch) => {
    axios.post(`${server}/users/auth`, { username, password}).then(res => {
      dispatch({
        type: USER_AUTHENTICATED,
        payload: res.data.user
      });
      setLocalAuth(res.data.token, res.data.user._id).then(() => {
        dispatch({
          type: DIALOG_CLOSE
        });
        dispatch({
          type: SNACK_OPEN,
          payload: `Welcome ${res.data.user.username}, you are now signed in.`
        });
      })
    }, err => err.response ? dispatch(handleErr(AUTH_ERROR, err.response.data.message)) : dispatch(handleErr(AUTH_ERROR, `Couldn't communicate with the server. Please try again later.`)));
  };
};

export const getToken = (email, history) => {
  return (dispatch) => {
    axios.post(`${server}/users/forgotPass`, { email }).then(res => {
      dispatch({
        type: USER_FORGOT_PASS,
        payload: res.data
      });
      dispatch({
        type: SNACK_OPEN,
        payload: `Please check your email to continue resetting your password.`
      });
      history.push('/');
    }, err => dispatch(handleErr(AUTH_ERROR, err.response.data.message)));
  }
};

export const resetPass = (token, password, confirmPassword, history) => {
  return (dispatch) => {
    checkPassword(password, confirmPassword).then(() => {
      axios.post(`${server}/users/resetPass`, { token, password}).then(res => {
        dispatch({
          type: USER_RESET_PASS,
          payload: res.data
        });
        dispatch({
          type: SNACK_OPEN,
          payload: `Password changed! Please Sign in using your new password.`
        });
        history.push('/');
      }, err => err.response ? dispatch(handleErr(AUTH_ERROR, err.response.data.message)) : dispatch(handleErr(AUTH_ERROR, `Couldn't communicate with the server. Please try again later.`)));
    }, err => dispatch(handleErr(AUTH_ERROR, err)));
  }
};

export const logout = () => {
  return (dispatch) => {
    rmAuth().then(() => {
      dispatch({
        type: USER_LOGOUT
      });
      dispatch({
        type: SNACK_OPEN,
        payload: `You are now signed out. Bye!`
      });
    });
  }
}

export const likeTerm = (data) => {
  return (dispatch) => {
    dispatch({
      type: USER_TERM_LIKE,
      payload: data
    });
  }  
};

export const unlikeTerm = (data) => {
  return (dispatch) => {
    dispatch({
      type: USER_TERM_UNLIKE,
      payload: data
    })
  }
};
