import { combineReducers } from 'redux';
import products from './productReducer';
import categories from './categoryReducer';
import currencies from './currencyReducer';
import suppliers from './supplierReducer';
import orders from './orderReducer';

export default combineReducers({
  products,
  categories,
  currencies,
  suppliers,
  orders,
});
