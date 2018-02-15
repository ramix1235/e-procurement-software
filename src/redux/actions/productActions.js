import axios from 'axios';

export function getProducts() {
  return dispatch => {
    return axios
      .get('/api/product/getProducts')
      .then(products => {
        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: products.data });
        return products.data;
      });
  };
}