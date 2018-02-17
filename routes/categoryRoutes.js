const categoryController = require('../controllers/categoryController');

module.exports = (app) => {
  app.get('/api/category/getCategories', (req, res) => {
    categoryController.getCategories(req, res);
  });

  app.post('/api/category/addCategory', (req, res) => {
    categoryController.addCategory(req, res);
  });
};