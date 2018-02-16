import axios from 'axios';

export function getCategories() {
  return dispatch => {
    return axios
      .get('/api/category/getCategories')
      .then(categories => {
        dispatch({ type: 'GET_CATEGORIES_SUCCESS', payload: categories.data });
        return categories.data;
      });
  };
}