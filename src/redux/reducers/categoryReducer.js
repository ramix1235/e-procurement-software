export default function category(state = [], action) {
  switch (action.type) {
    case 'GET_CATEGORIES_SUCCESS':
    // case 'ADD_PRODUCT_SUCCESS':
    // case 'DELETE_PRODUCT_SUCCESS':
    // case 'EDIT_PRODUCT_SUCCESS':
      return action.payload;
    default:
      return state;
  }
}
