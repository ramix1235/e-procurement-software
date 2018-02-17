export default function category(state = [], action) {
  switch (action.type) {
    case 'GET_CURRENCIES_SUCCESS':
    case 'ADD_CURRENCY_SUCCESS':
    case 'EDIT_CURRENCY_SUCCESS':
    // case 'DELETE_CURRENCY_SUCCESS':
      return action.payload;
    default:
      return state;
  }
}
