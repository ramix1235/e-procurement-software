// import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import products from './productReducer';
import categories from './categoryReducer';
import currencies from './currencyReducer';
import suppliers from './supplierReducer';

export default combineReducers({
  products,
  categories,
  currencies,
  suppliers,
});
