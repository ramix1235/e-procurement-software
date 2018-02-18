export default function supplier(state = [], action) {
  switch (action.type) {
    case 'GET_SUPPLIERS_SUCCESS':
    case 'ADD_SUPPLIER_SUCCESS':
    case 'EDIT_SUPPLIER_SUCCESS':
    case 'DELETE_SUPPLIER_SUCCESS':
      return action.payload;
    default:
      return state;
  }
}
