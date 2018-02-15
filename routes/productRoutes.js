const productController = require('../controllers/productController');

module.exports = (app) => {
  // GET
  app.get('/api/product/getProducts', (req, res) => {
    productController.getProducts(req, res);
  });
};