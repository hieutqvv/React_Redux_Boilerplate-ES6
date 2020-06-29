import React, {Component} from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import storage from 'redux-persist/es/storage';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {setHttpClient, setTokenOnHttpClient} from './actions';
import rootReducers from './reducers';
import axios from 'axios';
import axiosMock from '../../__mocks__/authMocks'

class Store extends Component {
  constructor(props) {
    super(props);

    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    this.store = createStore(
      persistReducer({key: 'persistedStore', storage}, rootReducers),
      composeEnhancer(applyMiddleware(this.subscriber)),
    );

    /**
     * Instance of Axios
     *
     * @type {AxiosInstance}
     */
    const http = axios.create({
      baseURL: process.env.REACT_APP_CORE_API_ENDPOINT,
    });

    this.store.dispatch(setHttpClient(http));

    /**
     * Mock Instance of Axios
     *
     * @type {AxiosInstance}
     */
    axiosMock.mockAuthorization(http, process.env.REACT_APP_CORE_API_ENDPOINT)

    this.persistor = persistStore(this.store, null, () => {
      const states = this.store.getState();
      if (states.identity.accessToken) {
        this.store.dispatch(setTokenOnHttpClient(states.identity));
      }
    });
  }

  subscriber(store) {
    return next => action => {
      /**
       * Here is before dispatch.
       */
      const returnValue = next(action);
      /**
       * Here is after dispatch.
       */
      // Do some things after dispatch

      /**
       * This will likely be the action itself, unless
       * 
       * a middleware further in chain changed it.
       */
      return returnValue;
    };
  }

  render() {
    return (
      <Provider store={this.store}>
        <PersistGate loading={null} persistor={this.persistor}>
          {this.props.children}
        </PersistGate>
      </Provider>
    );
  }
}

export default Store;
