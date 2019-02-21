import fetchJsonp from 'fetch-jsonp';
import {
  apiKey,
  apiSecret
} from '../utils/apiConstants.js';
import { FETCH_PETS, FETCH_PET_DETAIL } from './constants.js';

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

export const petDetailFetch = petId => {
  const url = `http://api.petfinder.com/pet.get?key=${apiKey}&format=json&id=${petId}`;
  const request = fetchJsonp(url, { headers: { 'Authorization': apiSecret } })
    .then(res => {
      return res.json();
    });
  return {
    type: FETCH_PET_DETAIL,
    payload: request,
    meta: { petId }
  };
};