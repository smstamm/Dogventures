import fetchJsonp from 'fetch-jsonp';
import {
  apiKey,
  apiSecret
} from '../utils/apiConstants.js';
import { FETCH_PETS } from './constants.js';

export const petsFetch = zip => {
  const url = `http://api.petfinder.com/pet.find?key=${apiKey}&format=json&count=90&animal=dog&location=${zip}`;
  const request = fetchJsonp(url, { headers: { 'Authorization': apiSecret } })
    .then(res => {
      return res.json();
    });
  return {
    type: FETCH_PETS,
    payload: request
  };
};