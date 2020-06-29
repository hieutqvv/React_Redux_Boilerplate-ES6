import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AdminLayout from './container/Layouts/AdminLayout';
import Store from './lib/redux';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Store>
        <HashRouter>
          <Switch>
            <Route path='/' name='home' component={AdminLayout} />
          </Switch>
        </HashRouter>
      </Store>
    );
  }
}

export default App;
