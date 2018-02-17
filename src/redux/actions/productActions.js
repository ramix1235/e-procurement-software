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

export function editProduct(editingProduct) {
  return dispatch => {
    return axios
      .post('/api/product/editProduct', {
        product: editingProduct
      })
      .then(products => {
        dispatch({ type: 'EDIT_PRODUCT_SUCCESS', payload: products.data });
        return products.data;
      })
      .catch(err => {
        if (err) throw err;
      });
  };
}

export function deleteProduct(deletingProduct) {
  return dispatch => {
    return axios
      .post('/api/product/deleteProduct', {
        product: deletingProduct
      })
      .then(products => {
        dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: products.data });
        return products.data;
      })
      .catch(err => {
        if (err) throw err;
      });
  };
}