import React, {Component, Suspense} from 'react';
import {connect} from 'react-redux';
import {
  isRequesting,
  updateIdentity,
  updateMe,
  logout,
  initializeDone,
  setTokenOnHttpClient,
} from '../../lib/redux/actions';
import moment from 'moment';
import Loading from './Loading';

const LoginForm = React.lazy(() => import('../../components/Auth/LoginForm'));

class AuthorityContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // `true` when initialized.
      isInitialized: false,
    };
    /**
     * URLs of unrestricted page.
     *
     * @type {string[]}
     */
    this.unrestrictedUrls = [
      '/authentications',
      '/users/password',
    ];
    this.initialized = this.initialized.bind(this);
    this.request = this.request.bind(this);
    this.onLoginDone = this.onLoginDone.bind(this);
  }

  isLogout() {
    return !this.props.identity.refreshToken && !this.props.identity.accessToken && !this.props.me;
  }

  /**
   * When should logout, return `true`.
   *
   * @returns {boolean}
   */
  shouldLogout() {
    return !this.props.identity.refreshToken ||
      (!this.props.identity.refreshToken && !this.props.identity.accessToken);
  }

  /**
   * When should re-authenticate, return `true`.
   *
   * @returns {boolean}
   */
  shouldReAuthenticate() {
    const expiresIn = moment(this.props.identity.expiresIn * 1000, 'x');
    // Expire within 5 minutes.
    return expiresIn.isBefore(moment().add(5, 'minutes'));
  }

  /**
   * When should request `me`, return `true`.
   *
   * @returns {boolean}
   */
  shouldRequestMe() {
    return !this.props.me;
  }

  /**
   * Re-authentication to get a new access token by a refresh token.
   *
   * @returns {Promise<void>}
   */
  async reAuthenticate() {
    return await this.props.http({
      method: 'post',
      url: '/authentications',
      data: {refreshToken: this.props.identity.refreshToken},
    }).catch(error => {
      this.props.logout();
      this.props.requestDone();
    });
  }

  /**
   * To get `me` by API.
   *
   * @returns {Promise<any>}
   */
  async requestMe() {
    return await this.props.http.request({
      url: '/me',
    }).catch(error => {
      this.props.logout();
      this.props.requestDone();
    });
  }

  /**
   * confirm existence of a user by API.
   *
   * - Logout if there is no refresh token and access token.
   *   - `me` and `identity` will be remove when logout.
   * - Re-authenticate if `identity` almost expire.
   * - Request `me` if there is `identity` but no `me`
   *   - A reason of why do this is `me` is not persisted, so it needs to be get every HTTP request.
   *
   * @param {function} cb Callback after perform the method
   * @returns {Promise<*>}
   */
  async confirmExistence(cb = undefined) {
    let response;
    if (!this.isLogout()) {
      this.props.requestStarted();
      if (this.shouldLogout()) {
        this.props.logout();
        return this.props.requestDone();
      }

      if (this.shouldReAuthenticate()) {
        response = await this.reAuthenticate();
        this.props.updateIdentity(response.data);
        this.props.setTokenOnHttpClient(response.data);
      }

      if (this.shouldRequestMe()) {
        response = await this.requestMe();
        this.props.updateMe(response.data);
      }
    }

    if (typeof cb === 'function') {
      cb(response);
    }
  }

  /**
   * Do XHR
   *
   * - Access token will be added when a URL is not contain in `unrestrictedUrls`.
   * - This method will be stored into `http` of store.
   *
   * @param {Object} config
   * @returns {Promise<*>}
   * @see https://github.com/axios/axios#request-config
   */
  async request(config) {
    await this.confirmExistence();
    if (!this.unrestrictedUrls.includes(config.url)) {
      if (config.headers === undefined) {
        config.headers = {};
      }
      config.headers.Authorization = `bearer ${this.props.identity.accessToken}`;
    }
    return this.props.http(config).then(this.props.requestDone);
  }

  /**
   * Perform before render.
   *
   * - Perform `this.initialized()` as callback of `this.confirmExistence`.
   *
   * @returns {Promise<*>}
   */
  componentWillMount() {
    return this.confirmExistence(this.initialized);
  }

  /**
   * Perform after initialize.
   *
   * @param response `Promise` from `this.confirmExistence`
   * @returns {*}
   */
  initialized(response) {
    this.props.requestDone();
    this.setState({isInitialized: true});
    return response;
  }

  loading() {
    return (<Loading/>);
  }

  onLoginDone() {
    this.setState({isInitialized: true});
  }

  render() {
    console.log(this.props)
    if (this.props.me === null) {
      return (
        <Suspense fallback={this.loading()}>
          <Loading/>
          <LoginForm onLoginDone={this.onLoginDone}/>
        </Suspense>
      );
    }
    if (this.state.isInitialized !== true) {
      return (<div>
        <Loading/>
      </div>);
    }
    return (<div><Loading/>{this.props.children}</div>);
  };
}

const mapStateToProps = (storeState, ownProps) => {
  let newState = Object.assign({}, ownProps);

  newState.identity = storeState.identity;
  newState.me = storeState.me;
  newState.http = storeState.http;

  return newState;
};

const mapDispatchToProps = dispatch => {
  return {
    requestStarted: () => dispatch(isRequesting(true)),
    requestDone: response => {
      dispatch(isRequesting(false));
      return response;
    },
    updateIdentity: identity => dispatch(updateIdentity(identity)),
    updateMe: me => dispatch(updateMe({me})),
    logout: () => dispatch(logout()),
    initializeDone: () => dispatch(initializeDone()),
    setTokenOnHttpClient: identity => dispatch(setTokenOnHttpClient(identity)),
  };
};

const Authority = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorityContainer);
export default Authority;
