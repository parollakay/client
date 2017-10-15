import { DIALOG_CLOSE, DIALOG_OPEN, SNACK_CLOSE, SNACK_OPEN } from '../actions'

const defaultState = {
  open: false,
  snack: false
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case DIALOG_CLOSE:
      return { open: false, snack: state.snack };
    case DIALOG_OPEN:
      return { open: true, snack: state.snack };
    case SNACK_CLOSE:
      return { open: state.open, snack: false };
    case SNACK_OPEN:
      return { open: state.open, snack:true, snackMessage: action.payload };
    default:
      return state;
  }
}