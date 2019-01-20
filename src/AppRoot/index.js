import React, { Component } from 'react';
import About from '../About';
import Home from '../Home';
import Search from '../Search';
import { Router } from '@reach/router';

import './index.css';

class AppRoot extends Component {
  render() {
    return (
      <div className='AppRoot'>
        <Router>
          <Home path='/' />
          <About path='about' />
          <Search path='search/:zip' />
        </Router>
      </div>
    );
  }
}

export default AppRoot;
