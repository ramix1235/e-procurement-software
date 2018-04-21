/* eslint-disable arrow-body-style */
import axios from 'axios';

export function getCurrencies() {
  return (dispatch) => {
    return axios
      .get('/api/currency/getCurrencies')
      .then((currencies) => {
        dispatch({ type: 'GET_CURRENCIES_SUCCESS', payload: currencies.data });
        return currencies.data;
      });
  };
}

export function addCurrency(newCurrency) {
  return (dispatch) => {
    return axios
      .post('/api/currency/addCurrency', {
        currency: newCurrency,
      })
      .then((currencies) => {
        dispatch({ type: 'ADD_CURRENCY_SUCCESS', payload: currencies.data });
        return currencies.data;
      })
      .catch((err) => {
        if (err) throw err;
      });
  };
}

export function editCurrency(editingCurrency) {
  return (dispatch) => {
    return axios
      .post('/api/currency/editCurrency', {
        currency: editingCurrency,
      })
      .then((currencies) => {
        dispatch({ type: 'EDIT_CURRENCY_SUCCESS', payload: currencies.data });
        return currencies.data;
      })
      .catch((err) => {
        if (err) throw err;
      });
  };
}


export function deleteCurrency(deletingCurrency) {
  return (dispatch) => {
    return axios
      .post('/api/currency/deleteCurrency', {
        currency: deletingCurrency,
      })
      .then((currencies) => {
        dispatch({ type: 'DELETE_CURRENCY_SUCCESS', payload: currencies.data });
        return currencies.data;
      })
      .catch((err) => {
        if (err) throw err;
      });
  };
}
