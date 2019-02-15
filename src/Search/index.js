/*
*
Search index.js
*
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { petsFetch } from '../redux/actions.js';

import './index.css';

const select = (state) => ({
  pets: state.PetsReducer.pets,
});

class Search extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    pets: PropTypes.array.isRequired,
    petsFetch: PropTypes.func.isRequired,
    zip: PropTypes.string.isRequired
  };

  componentDidMount() {
    if (this.props.pets.length === 0) { // TODO also account for user manipulating URL
      this.props.petsFetch(this.props.zip);
    }
  }

  render() {
    return (
      <div className='gridList'>
        {this.props.pets.map(pet =>
          <div key={pet.id} className='gridTile'>
            <img src={pet.photos[0]} alt={`${pet.name}`} />
            <div className='caption'><h4>{pet.name}</h4></div>
          </div>
        )}
      </div>
    );
  }
}
  
export default connect(select, { petsFetch })(Search);