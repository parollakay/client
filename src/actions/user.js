import { handleErr, server, setLocalAuth, rmAuth, checkPassword } from '../utils';
import axios from 'axios';
import { DIALOG_CLOSE, SNACK_OPEN, DRAWER_ERROR, DRAWER_CLOSED } from './';

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
export const USER_POPULATED = 'USER_POPULATED';
export const LOADED_REMAINING_ACHIEVEMENTS = 'LOADED_REMAINING_ACHIEVEMENTS';
export const NOTIFICATION_SETTINGS_UPDATED = 'NOTIFICATION_SETTINGS_UPDATED';
export const NOTIFICATION_MARKED_READ = 'NOTIFICATION_MARKED_READ'; 
export const NOTIFICATIONS_CLEARED = 'NOTIFICATIONS_CLEARED';


export const clearUserErr = () => dispatch => dispatch({ type: USER_ERR_CLEAR });
export const addUserErr = error => dispatch => dispatch(handleErr(AUTH_ERROR, error));

const getStorage = () => {
  return {
    token: localStorage.getItem('x-access-token'),
    userId: localStorage.getItem('x-user-id')
  }
}

export const updateNotifications = (payload) => {
  return dispatch => {
    dispatch({
      type: NOTIFICATION_SETTINGS_UPDATED,
      payload,
    })
  }
}

export const clearAllNotifications = () => {
  const token = localStorage.getItem('x-access-token');
  const userId = localStorage.getItem('x-user-id');
  return dispatch => {
    axios.delete(`${server}/users/${userId}/notifications_clear?token=${token}`).then(res => {
      dispatch({
        type: USER_UPDATED,
        payload: res.data
      });
      dispatch({
        type: SNACK_OPEN,
        payload: 'Notifications cleared.'
      })
    }, e => dispatch(handleErr(DRAWER_ERROR, 'Please restart your browser and try again.')))
  }
}

export const deleteNotification = notification => {
  const token = localStorage.getItem('x-access-token');
  const userId = localStorage.getItem('x-user-id');
  return dispatch => {
    axios.delete(`${server}/users/${userId}/notification_delete/${notification}?token=${token}`).then(res => {
      dispatch({
        type: NOTIFICATION_MARKED_READ,
        payload: res.data
      });
      dispatch({
        type: SNACK_OPEN,
        payload: 'Notification Deleted.'
      });
    }, e => dispatch(handleErr(DRAWER_ERROR, 'Please restart your browser and try again.')));
  }
}

export const markNotificationRead = notification => {
  const token = localStorage.getItem('x-access-token');
  const userId = localStorage.getItem('x-user-id');
  return dispatch => {
    axios.put(`${server}/users/${userId}/notification_read/${notification}?token=${token}`).then(res => {
      console.log(res);
      dispatch({
        type: NOTIFICATION_MARKED_READ,
        payload: res.data
      });
      dispatch({
        type: SNACK_OPEN,
        payload: 'Marked As Read.'
      });
    }, e => {
      dispatch({
        type: DRAWER_ERROR,
        payload: 'Please restart your browser and try again.'
      });
    });
  }
}

export const getpopulatedUser = () => {
  const token = localStorage.getItem('x-access-token');
  const userId = localStorage.getItem('x-user-id');
  return dispatch => {
    axios.get(`${server}/users/${userId}/populatedUser?token=${token}`).then(res => {
      console.log(res.data);
      dispatch({
        type: USER_POPULATED,
        payload: res.data
      });
      
    }, e => dispatch(handleErr(AUTH_ERROR, 'Could not get your account details.')))
  }
}

export const addAchievements = () => {
  return dispatch => {
    axios.get(`${server}/utils/achievements`).then(response => {      
      dispatch({
        type: LOADED_REMAINING_ACHIEVEMENTS,
        payload: response.data
      });
    });
  }
}
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
          setLocalAuth(res.data.token, res.data.user._id, res.data.user.role).then(() => {
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
      console.log(res.data.user);
      dispatch({
        type: USER_AUTHENTICATED,
        payload: res.data.user
      });
      setLocalAuth(res.data.token, res.data.user._id, res.data.user.role).then(() => {
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
      dispatch({
        type: DRAWER_CLOSED
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
