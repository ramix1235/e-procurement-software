export default function category(state = [], action) {
  switch (action.type) {
    case 'GET_CATEGORIES_SUCCESS':
    case 'ADD_CATEGORY_SUCCESS':
    // case 'DELETE_CATEGORY_SUCCESS':
    // case 'EDIT_CATEGORY_SUCCESS':
      return action.payload;
    default:
      return state;
  }
}
