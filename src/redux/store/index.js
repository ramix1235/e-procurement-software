import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default (initialState) => {
  let enhancer = applyMiddleware(thunk);

  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');

    enhancer = composeWithDevTools(applyMiddleware(thunk));
  }
  const store = createStore(rootReducer, initialState, enhancer);

  return store;
};
