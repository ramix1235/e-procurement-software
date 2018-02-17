const productController = require('../controllers/productController');

module.exports = (app) => {
  app.get('/api/product/getProducts', (req, res) => {
    productController.getProducts(req, res);
  });

  app.post('/api/product/addProduct', (req, res) => {
    productController.addProduct(req, res);
  });

  app.post('/api/product/editProduct', (req, res) => {
    productController.editProduct(req, res);
  });

  app.post('/api/product/deleteProduct', (req, res) => {
    productController.deleteProduct(req, res);
  });
};