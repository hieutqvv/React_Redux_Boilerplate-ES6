/**
 * State indicating authentication information.
 *
 * Will be persistent.
 */
export default {
  /**
   * Login date and time
   *
   * If this State is null, the login form is displayed as if the login procedure has not been performed.
   */
  authorizedAt: null,
  // access token
  accessToken: null,
  // refresh Token
  refreshToken: null,
  /**
   * Access token expiration date
   *
   * Automatically re-authenticate after 5 minutes before the expiration date.
   */
  expiresIn: null,
};