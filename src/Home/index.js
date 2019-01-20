/*
*
Home index.js
*
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import styles from './index.css';

const muiStyles = () => ({
  cssFocused: {},
  cssLabel: {
    '&$cssFocused': {
      color: '#FFF',
    },
    borderWidth: '0px'
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#FFF',
    },
    borderWidth: '0px'
  },
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#FFF',
    },
  },
  notchedOutline: {}
});

class Home extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    location: ''
  };

  locationInputHandle = name => event => { // eslint-disable-line
    this.setState({ location: event.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className='homeContainer'>
        <div className='headlineContainer'>
          <h1 className='headline'>Find the perfect companion for your every adventure</h1>
        </div>
        <div className='textboxContainer'>
          <TextField
            autoFocus
            className={styles.textbox}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
              startAdornment:
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
            }}
            label='Find a co-pilot near you'
            onChange={this.locationInputHandle('name')}
            value={this.state.location}
            variant='outlined'
          />
        </div>
      </div>
    );
  }
}
  
export default withStyles(muiStyles)(Home);
