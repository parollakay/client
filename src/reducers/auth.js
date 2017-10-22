import { DIALOG_CLOSE, DIALOG_OPEN, SNACK_CLOSE, SNACK_OPEN, BADGE_DIALOG_CLOSE, BADGE_DIALOG_OPEN } from '../actions';

const defaultState = {
  open: false,
  snack: false,
  snackMessage: '',
  badgeOpen: false,
  badge: null,
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
      return { ...state, badge: null, badgeOpen: false }
    default:
      return state;
  }
}