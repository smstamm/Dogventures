/*
*
Home index.js
*
*/

import React, { Component } from 'react';
// import Proptypes from 'prop-types';
import { TextField } from '@material-ui/core';
import styles from './index.css';

class Home extends Component {
  render() {
    return (
      <div className={styles.home}>
        <TextField
          label='Zipcode'
          name='Zipcode'
          variant='outlined'
        />
      </div>
    );
  }
}
  
export default Home;
