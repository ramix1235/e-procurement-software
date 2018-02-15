const categoryController = require('../controllers/categoryController');

module.exports = (app) => {
  // GET
  app.get('/api/category/getCategories', (req, res) => {
    categoryController.getCategories(req, res);
  });
};