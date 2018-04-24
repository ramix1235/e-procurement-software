/* eslint-disable arrow-body-style */
import axios from 'axios';

export function getOrders() {
  return (dispatch) => {
    return axios
      .get('/api/order/getOrders')
      .then((orders) => {
        dispatch({ type: 'GET_ORDERS_SUCCESS', payload: orders.data });
        return orders.data;
      });
  };
}

export function addOrder(newOrder) {
  return (dispatch) => {
    return axios
      .post('/api/order/addOrder', {
        order: newOrder,
      })
      .then((orders) => {
        dispatch({ type: 'ADD_ORDER_SUCCESS', payload: orders.data });
        return orders.data;
      })
      .catch((err) => {
        if (err) throw err;
      });
  };
}

export function editOrder(editingOrder) {
  return (dispatch) => {
    return axios
      .post('/api/order/editOrder', {
        order: editingOrder,
      })
      .then((orders) => {
        dispatch({ type: 'EDIT_ORDER_SUCCESS', payload: orders.data });
        return orders.data;
      })
      .catch((err) => {
        if (err) throw err;
      });
  };
}


export function deleteOrder(deletingOrder) {
  return (dispatch) => {
    return axios
      .post('/api/order/deleteOrder', {
        order: deletingOrder,
      })
      .then((orders) => {
        dispatch({ type: 'DELETE_ORDER_SUCCESS', payload: orders.data });
        return orders.data;
      })
      .catch((err) => {
        if (err) throw err;
      });
  };
}

// export function updateCheckedItemsIndexes(indexes) {
//   return (dispatch) => {
//     dispatch({
//       type: 'UPDATE_CHECKED_ITEMS_INDEXES',
//       payload: indexes,
//     });
//   };
// }
