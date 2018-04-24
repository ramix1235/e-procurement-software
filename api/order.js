/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export function sendOrderEmailToSupplier(data) {
  return axios.post('/api/order/email', data);
}
