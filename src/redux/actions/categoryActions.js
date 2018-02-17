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

export function addCategory(newCategory) {
  return dispatch => {
    return axios
      .post('/api/category/addCategory', {
        category: newCategory
      })
      .then(categories => {
        dispatch({ type: 'ADD_CATEGORY_SUCCESS', payload: categories.data });
        return categories.data;
      })
      .catch(err => {
        if (err) throw err;
      });
  };
}

export function editCategory(editingCategory) {
  return dispatch => {
    return axios
      .post('/api/category/editCategory', {
        category: editingCategory
      })
      .then(categories => {
        dispatch({ type: 'EDIT_CATEGORY_SUCCESS', payload: categories.data });
        return categories.data;
      })
      .catch(err => {
        if (err) throw err;
      });
  };
}