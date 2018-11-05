import React, { Component } from 'react';
import Home from '../Home';
import './index.css';

class AppRoot extends Component {
  render() {
    return (
      <div className='AppRoot'>
        <Home />
      </div>
    );
  }
}

export default AppRoot;
