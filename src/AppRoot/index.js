import React, { Component } from 'react';
import About from '../About';
import Home from '../Home';
import Pets from '../Pets';
import PetDetail from '../PetDetail';
import { Router } from '@reach/router';

class AppRoot extends Component {
  render() {
    return (
      <div className='AppRoot'>
        <Router>
          <Home path='/' />
          <About path='/about' />
          <Pets path='/pets/zips/:zip' />
          <PetDetail path='/pets/:petId' />
        </Router>
      </div>
    );
  }
}

export default AppRoot;
