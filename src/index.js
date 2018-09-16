import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import { productReducer as product } from './reducers/product.reducer';
import { cartReducer as cart } from './reducers/cart.reducer';

import App from './app';

/**
 * defaultState = {
 *      product: {
 *          productList: [{}, {}], // Current list
 *      }
 *      cart: [{}, {}]
 * }
 * 
 */

const preloadedState = {
    product: {
        productList: []
    },
    cart: []
};

const rootReducer = combineReducers({ product, cart });

const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
);

render((
    <Provider store={store}>
       <App/>
    </Provider>
  ), document.getElementById('root'));
