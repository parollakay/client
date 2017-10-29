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
  USER_POPULATED,
  LOADED_REMAINING_ACHIEVEMENTS,
  NOTIFICATION_SETTINGS_UPDATED,
  DRAWER_ERROR,
  NOTIFICATION_MARKED_READ,
} from '../actions';

const defaultState = {
  data: {
    notifications: [],
    terms: [],
    upvotes: [],
    savedTerms: [],
    notificationSettings: {}
  },
  role: null,
  authenticated: false,
  populated: null
}

export default (user = defaultState, action) => {
  switch(action.type) {
    case USER_AUTHENTICATED:
      return { ...user, authenticated: true, data: action.payload, role: action.payload.role };
    case USER_CREATED:
      return { ...user, authenticated: true, data: action.payload, role: action.payload.role };
    case USER_FORGOT_PASS:
      return { ...user, authenticated: false, data: {} };
    case USER_RESET_PASS:
      return { ...user, authenticated: false, data: {} };
    case USER_UPDATED:
      return { ...user, authenticated: true, data: action.payload, role: action.payload.role };
    case USER_POPULATED:
      return { ...user, authenticated: true, populated: action.payload, role: action.payload.role };
    case LOADED_REMAINING_ACHIEVEMENTS:
      return { ...user, siteAchievements: action.payload };
    case NOTIFICATION_SETTINGS_UPDATED:
      let data = user.data;
      data.notificationSettings = action.payload;
      return { ...user, data };
    case NOTIFICATION_MARKED_READ:
      let newData = user.data;
      newData.notifications = action.payload.notifications;
      return { ...user, data: newData };
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