import {
  FETCH_PETS_FULFILLED,
  FETCH_PETS_REJECTED
} from './constants.js';

const PetsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PETS_FULFILLED: {
      return [
        ...state,
        action.payload.petfinder.pets.pet
      ];
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