/*
*
Home index.js
*
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { petsFetch } from '../actions.js';


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
    navigate: PropTypes.func,
    petsFetch: PropTypes.func.isRequired
  };

  state = {
    errors: [],
    zip: ''
  }

  errorsGet = (errorId) => {
    return this.state.errors.length > 0 ? this.state.errors.find(error => error.id === errorId).message : '';
  }

  petsFetch = () => {
    this.props.petsFetch(this.state.zip)
      .then(() => {
        this.props.navigate(`search/${this.state.zip}`);
      });
  }

  zipInputHandle = event => {
    this.setState({
      errors: [],
      zip: event.target.value
    });
  }

  zipValidate = () => {
    const errors = [];
    if (!this.state.zip.match(/^\b\d{5}(-\d{4})?\b$/)) {
      errors.push({
        id: 'zip',
        message: 'Enter a valid 5 or 9 digit US zip code.'
      });
    }
    this.setState({ errors });
    errors.length === 0 && this.petsFetch();
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
          <form className='buttonContainer' onSubmit={event => { event.preventDefault(); this.zipValidate(); }}>
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
              onClick={() => this.zipValidate()}
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

const mapDispatchToProps = dispatch => ({
  petsFetch: zip => dispatch(petsFetch(zip))
});

export default connect(null, mapDispatchToProps)(withStyles(muiStyles)(Home));