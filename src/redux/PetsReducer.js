import {
  FETCH_PETS_FULFILLED,
  FETCH_PETS_REJECTED
} from './constants.js';

const initialState = {
  pets: [],
  zip: ''
};

const PetsReducer = (state = initialState, action) => {
  const newState = state;
  switch (action.type) {
    case FETCH_PETS_FULFILLED: {
      newState.pets = action.payload.petfinder.pets.pet.map((pet) => ({
        age: pet.age.$t,
        breeds: pet.breeds.breed.length > 1 ? pet.breeds.breed.map(breed => breed.$t) : pet.breeds.breed.$t,
        contact: {
          address1: pet.contact.address1.$t,
          city: pet.contact.city.$t,
          email: pet.contact.email.$t,
          state: pet.contact.state.$t,
          zip: pet.contact.zip.$t
        },
        description: pet.description.$t,
        id: pet.id.$t,
        photos: pet.media.photos.photo.filter(photo => photo['@size'] === ('x' || 'pn')).map(photo => (photo.$t)),
        name: pet.name.$t,
        sex: pet.sex.$t,
        size: pet.size.$t,
      }));

      return newState;
    }
    case FETCH_PETS_REJECTED: {
      // TODO fire notification of failed request
      break; 
    }
    default: {
      return state;
    }
  }
};

export default PetsReducer;