/*
*
Home index.js
*
*/

import React, { Component } from 'react';
// import Proptypes from 'prop-types';
import { InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import styles from './index.module.css';

class Home extends Component {
  render() {
    return (
      <div className={styles.homeContainer}>
        <h1 className={styles.headline}>Find the perfect companion for your every adventure</h1>
        <div className={styles.textbox}>
          <TextField
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
            label='Find a co-pilot near you'
            name='Find a co-pilot near you'
            variant='outlined'
          />
        </div>
      </div>
    );
  }
}
  
export default Home;
