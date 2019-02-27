/*
*
Pets index.js
*
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { petsFetch } from '../redux/actions.js';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core';
import './index.css';

const select = (state) => ({
  pets: state.PetsReducer.pets,
});

const styles = {
  card: {
    maxWidth: 300,
  },
  media: {
    objectFit: 'none',
    objectPosition: '50% 5%'
  }
};

class Pets extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    pets: PropTypes.array.isRequired,
    petsFetch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.pets.length === 0) { // TODO also account for user manipulating URL
      this.props.petsFetch(this.props.match.params.zip);
    }
  }

  petDetailsGet = petId => {
    this.props.history.push(`/pets/${petId}`);
  }

  render() {
    return (
      <div className='gridList'>
        {this.props.pets.map(pet =>
          <Card key={pet.id}>
            <CardActionArea>
              {pet.photos.length > 0 ?
                <CardMedia
                  alt={pet.name}
                  className={this.props.classes.media}
                  component='img'
                  image={pet.photos[0]}
                  style={{ height: 200, width: 300 }}
                  title={pet.name}
                />
                :
                <div>{pet.name}</div>
              }
            </CardActionArea>
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>{pet.name}</Typography>
              <Typography component='p' className='description'>{pet.description}</Typography>
            </CardContent>
            <CardActions>
              <Button
                color='primary'
                onClick={() => this.petDetailsGet(pet.id)}
                size='small'
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        )}
      </div>
    );
  }
}
  
export default connect(select, { petsFetch })(withStyles(styles)(Pets));
