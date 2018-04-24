// const initialState = {
//   checkedItemsIndexes: [],
//   orders: [],
// };

export default function order(state = [], action) {
  switch (action.type) {
    case 'GET_ORDERS_SUCCESS':
    case 'ADD_ORDER_SUCCESS':
    case 'EDIT_ORDER_SUCCESS':
    case 'DELETE_ORDER_SUCCESS':
      return action.payload;
    // return { ...state, orders: action.payload };
    // case 'UPDATE_CHECKED_ITEMS_INDEXES':
    //   return { ...state, checkedItemsIndexes: action.payload };
    default:
      return state;
  }
}
