import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import mappyrApp from '../reducers/index';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(mappyrApp, initialState);

  return store;
}
