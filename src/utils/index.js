export const checkPassword = (password, confirmPass) => {
  return new Promise((resolve, reject) => {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (re.test(password)) {
      if (password !== confirmPass) {
        reject('Both passwords must match.')
      } else {
        resolve();
      }
    } else {
      reject('The password you entered is not valid. Passwords must contain all of the following: 6 characters or more, one number, one lowercase and one uppercase letter.');
    }
  });
}