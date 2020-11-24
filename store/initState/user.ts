const initState = {
  me: null,
  /*me {
      uid(pin):""
      displayName(pin):null
      photoURL(pin):null
      email(pin):""
      emailVerified(pin):false
      phoneNumber(pin):null
      isAnonymous(pin):false
      tenantId(pin):null  
  }**/
  loginLoading: false,
  loginDone: false,
  loginError: null,
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  signupLoading: false,
  signupDone: false,
  signupError: null,
  addFriendLoading: false,
  addFriendDone: false,
  addFriendError: null,
  addedNewFriend: false,
  editProfileLoading: false,
  editProfileDone: false,
  editProfileError: null,
};

export default initState;