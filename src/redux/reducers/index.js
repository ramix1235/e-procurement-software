import { combineReducers } from 'redux';
import products from './productReducer';
import categories from './categoryReducer';
import currencies from './currenciesReducer';

export default combineReducers({
  products,
  categories,
  currencies
});