export const DIALOG_CLOSE = 'DIALOG_CLOSE';
export const DIALOG_OPEN = 'DIALOG_OPEN';
export const SNACK_OPEN = 'SNACK_OPEN';
export const SNACK_CLOSE ='SNACK_CLOSE';


export const openDialog = () => {
  return {
    type: DIALOG_OPEN
  }
}

export const closeDialog = () => {
  return {
    type: DIALOG_CLOSE
  }
}

export const showSnack = (message) => {
  return {
    type: SNACK_OPEN,
    payload: message
  }
}

export const hideSnack = () => {
  return {
    type: SNACK_CLOSE
  }
}

