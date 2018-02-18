const supplierController = require('../controllers/supplierController');

module.exports = (app) => {
  app.get('/api/supplier/getSuppliers', (req, res) => {
    supplierController.getSuppliers(req, res);
  });

  app.post('/api/supplier/addSupplier', (req, res) => {
    supplierController.addSupplier(req, res);
  });

  app.post('/api/supplier/editSupplier', (req, res) => {
    supplierController.editSupplier(req, res);
  });

  app.post('/api/supplier/deleteSupplier', (req, res) => {
    supplierController.deleteSupplier(req, res);
  });
};