import axios from 'axios';

export function getSuppliers() {
  return dispatch => {
    return axios
      .get('/api/supplier/getSuppliers')
      .then(suppliers => {
        dispatch({ type: 'GET_SUPPLIERS_SUCCESS', payload: suppliers.data });
        return suppliers.data;
      });
  };
}

export function addSupplier(newSupplier) {
  return dispatch => {
    return axios
      .post('/api/supplier/addSupplier', {
        supplier: newSupplier
      })
      .then(suppliers => {
        dispatch({ type: 'ADD_SUPPLIER_SUCCESS', payload: suppliers.data });
        return suppliers.data;
      })
      .catch(err => {
        if (err) throw err;
      });
  };
}

export function editSupplier(editingSupplier) {
  return dispatch => {
    return axios
      .post('/api/supplier/editSupplier', {
        supplier: editingSupplier
      })
      .then(suppliers => {
        dispatch({ type: 'EDIT_SUPPLIER_SUCCESS', payload: suppliers.data });
        return suppliers.data;
      })
      .catch(err => {
        if (err) throw err;
      });
  };
}

export function deleteSupplier(deletingSupplier) {
  return dispatch => {
    return axios
      .post('/api/supplier/deleteSupplier', {
        supplier: deletingSupplier
      })
      .then(suppliers => {
        dispatch({ type: 'DELETE_SUPPLIER_SUCCESS', payload: suppliers.data });
        return suppliers.data;
      })
      .catch(err => {
        if (err) throw err;
      });
  };
}