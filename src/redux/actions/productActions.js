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

export function addProduct(newProduct) {
  return dispatch => {
    return axios
      .post('/api/product/addProduct', {
        product: newProduct
      })
      .then(products => {
        dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: products.data });
        return products.data;
      })
      .catch(err => {
        if (err) throw err;
      });
  };
}