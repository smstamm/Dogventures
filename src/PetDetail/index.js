/*
*
PetDetail index.js
*
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { petDetailFetch } from '../redux/actions.js';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia
} from '@material-ui/core';

const select = (state, props) => {
  if (state.PetsReducer.pets.length > 0 && state.PetsReducer.pets.some(pet => pet.id === props.petId)) {
    return { pet: state.PetsReducer.pets.find(pet => pet.id === props.petId) };
  }
  else if (state.PetsReducer.petDetail.id === props.match.params.petId) {
    return {pet: state.PetsReducer.petDetail};
  }
  else {
    return { pet: {} };
  }
};

const styles = {
  card: {
    maxWidth: 300,
  },
  media: {
    objectFit: 'none',
    objectPosition: '50% 50%'
  }
};

class PetDetail extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    pet: PropTypes.object.isRequired,
    petDetailFetch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (Object.keys(this.props.pet).length === 0) {
      this.props.petDetailFetch(this.props.match.params.petId);
    }
  }

  render() {
    const { pet } = this.props;
    if (Object.keys(pet).length > 0) {
      return (
        <div>
          <Card>
            {pet.photos.length > 0 ?
              <CardMedia
                alt={pet.name}
                className={this.props.classes.media}
                component='img'
                image={pet.photos[0]}
                style={{ height: 300 }}
                title={pet.name}
              />
              :
              <div>{pet.name}</div>
            }
            <CardContent>
              {pet.description}
            </CardContent>
            <CardActions>
              <a
                href={`mailto:?subject=Check out ${pet.name}&body=Read all about ${pet.name} at ${window.location.href}`}
                rel='noopener noreferrer'
                style={{ textDecoration: 'none' }}
                target='_blank'
              >
                <Button size='small' color='primary'>
                  Share
                </Button>
              </a>
              <a
                href={`mailto:${pet.contact.email}?subject=Adoption of ${pet.name}`}
                rel='noopener noreferrer'
                style={{ textDecoration: 'none' }}
                target='_blank'
              >
                <Button
                  color='primary'
                  size='small'
                >
                  Contact Shelter
                </Button>
              </a>
              
            </CardActions>
  
          </Card>
        </div>
      );
    }
    else {
      return (<div>doggo details here</div>);
    }
  }
}

export default connect(select, { petDetailFetch })(withStyles(styles)(PetDetail));