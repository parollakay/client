import { DIALOG_CLOSE, DIALOG_OPEN, SNACK_CLOSE, SNACK_OPEN } from '../actions'

const defaultState = {
  open: false,
  snack: false,
  snackMessage: '',
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case DIALOG_CLOSE:
      return {...state, open:false};
    case DIALOG_OPEN:
      return {...state, open: true};
    case SNACK_CLOSE:
      return {...state, snack:false };
    case SNACK_OPEN:
      return {...state, snack: true, snackMessage: action.payload };
    default:
      return state;
  }
}