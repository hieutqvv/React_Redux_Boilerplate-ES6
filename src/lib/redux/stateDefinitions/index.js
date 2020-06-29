import identity from './identity';

export default {
  // Access token of login user. (persist)
  identity,
  // User data of who login.
  me: null,
  // Prevent manipulate user when this is true.
  isRequesting: false,
  // Error message
  lastError: '',
  lastErrorDescription: '',
  http: null,
  initializeDone: false,
  isVerified: false,
};
