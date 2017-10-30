import { 
  DIALOG_CLOSE, 
  DIALOG_OPEN, 
  SNACK_CLOSE, 
  SNACK_OPEN, 
  BADGE_DIALOG_CLOSE, 
  BADGE_DIALOG_OPEN, 
  DRAWER_CLOSED, 
  DRAWER_OPEN,
  DRAWER_ERROR,
  DRAWER_ERROR_CLEAR
 } from '../actions';

const defaultState = {
  open: false,
  snack: false,
  snackMessage: '',
  badgeOpen: false,
  badge: null,
  drawerOpen: false,
  drawerTab: 'a'
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case DIALOG_CLOSE:
      return {...state, open:false };
    case DIALOG_OPEN:
      return {...state, open: true };
    case SNACK_CLOSE:
      return {...state, snack:false };
    case SNACK_OPEN:
      return {...state, snack: true, snackMessage: action.payload };
    case BADGE_DIALOG_OPEN:
      return { ...state, badge: action.payload, badgeOpen: true };
    case BADGE_DIALOG_CLOSE:
      return { ...state, badge: null, badgeOpen: false };
    case DRAWER_OPEN:
      return { ...state, drawerOpen: true, drawerTab: action.payload };
    case DRAWER_CLOSED:
      return { ...state, drawerOpen: false };
    case DRAWER_ERROR:
      return { ...state, drawerError: action.payload };
    case DRAWER_ERROR_CLEAR:
      return { ...state, drawerError: null };
    default:
      return state;
  }
}