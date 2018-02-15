export default function product(state = [], action) {
  switch (action.type) {
    case 'GET_PRODUCTS_SUCCESS':
    // case 'ADD_PRODUCT_SUCCESS':
    // case 'DELETE_PRODUCT_SUCCESS':
    // case 'EDIT_PRODUCT_SUCCESS':
      return action.payload;
    default:
      return state;
  }
}
