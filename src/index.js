import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './redux/rootReducer';
import AppRoot from './AppRoot';
import * as serviceWorker from './serviceWorker';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from './utils/storeHelpers';
import { throttle } from 'lodash';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';

const persistedState = loadState();

const store = process.env.NODE_ENV === 'development' ?
  createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(promiseMiddleware()))) :
  createStore(rootReducer, persistedState, applyMiddleware(promiseMiddleware()));

store.subscribe(throttle(() => {
  saveState(store.getState({
    pets: store.getState().PetsReducer.pets,
    petDetail: store.getState().PetsReducer.petDetail
  }));
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppRoot />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
