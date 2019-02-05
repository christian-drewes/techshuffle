import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import 'antd/dist/antd.css';

import Home from './components/Home'
import About from './components/About'
import Navigation from './components/Navigation'
import Search from './components/Search'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
        <>
          <Navigation />
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/about' component={About} />
            <Route path='/search' component={Search} />
          </Switch>
        </>
        </BrowserRouter>
    );
  }
}

export default App;
