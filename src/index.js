import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './rootReducer';
import AppRoot from './AppRoot';
import * as serviceWorker from './serviceWorker';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';

const store = process.env.NODE_ENV === 'development' ?
  createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware()))) :
  createStore(rootReducer, applyMiddleware(promiseMiddleware()));

ReactDOM.render(
  <Provider store={store}>
    <AppRoot />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
