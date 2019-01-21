/*
*
Home index.js
*
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import fetchJsonp from 'fetch-jsonp';
import {
  apiKey,
  apiSecret
} from '../apiConstants.js';

import './index.css';

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
    classes: PropTypes.object.isRequired,
    navigate: PropTypes.func
  };

  state = {
    errors: [],
    zip: ''
  }

  errorsGet = (errorId) => {
    return this.state.errors.length > 0 ? this.state.errors.find(error => error.id === errorId).message : '';
  }

  petsFetch = () => {
    const url = `http://api.petfinder.com/pet.find?key=${apiKey}&format=json&count=90&animal=dog&location=${this.state.zip}`;
    
    fetchJsonp(url, { headers: { 'Authorization': apiSecret } })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res.petfinder.pets);
        this.props.navigate(`search/${this.state.zip}`);
      });
  }

  zipInputHandle = event => {
    this.setState({
      errors: [],
      zip: event.target.value
    });
  }

  zipValidate = nextStep => {
    const errors = [];
    if (!this.state.zip.match(/^\b\d{5}(-\d{4})?\b$/)) {
      errors.push({
        id: 'zip',
        message: 'Enter a valid 5 or 9 digit US zip code.'
      });
    }
    this.setState({ errors });
    errors.length === 0 && nextStep();
  }

  render() {
    const { classes } = this.props;
    const { errors, zip } = this.state;
    const zipError = this.errorsGet('zip');

    return (
      <div className='homeContainer'>
        <div className='headlineContainer'>
          <h1 className='headline'>Find the perfect companion for your every adventure</h1>
        </div>
        <FormControl error={Boolean(zipError)}>
          <form className='buttonContainer' onSubmit={event => { event.preventDefault(); this.zipValidate(this.petsFetch); }}>
            <TextField
              autoFocus
              error={Boolean(errors)}
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
              onChange={this.zipInputHandle}
              value={zip}
              variant='outlined'
            />
            <Button
              onClick={() => this.zipValidate(this.petsFetch)}
              variant='contained'
            >
              Find your co-pilot
            </Button>
          </form>
          {zipError && <FormHelperText>{zipError}</FormHelperText>}
        </FormControl>
      </div>
    );
  }
}

export default withStyles(muiStyles)(Home);