import axios from 'axios';

export function getCurrencies() {
  return dispatch => {
    return axios
      .get('/api/currency/getCurrencies')
      .then(currencies => {
        dispatch({ type: 'GET_CURRENCIES_SUCCESS', payload: currencies.data });
        return currencies.data;
      });
  };
}