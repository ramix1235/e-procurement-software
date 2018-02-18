const supplierController = require('../controllers/supplierController');

module.exports = (app) => {
  app.get('/api/supplier/getSuppliers', (req, res) => {
    supplierController.getSuppliers(req, res);
  });

  app.post('/api/supplier/addSupplier', (req, res) => {
    supplierController.addSupplier(req, res);
  });

};