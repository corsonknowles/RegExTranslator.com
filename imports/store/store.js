import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';

const middlewares = [thunk];

// Add logger if not on development server
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-logger').logger);
}

export default (preloadedState = {}) => (
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  )
);
