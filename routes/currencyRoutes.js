const currencyController = require('../controllers/currencyController');

module.exports = (app) => {
  // GET
  app.get('/api/currency/getCurrencies', (req, res) => {
    currencyController.getCurrencies(req, res);
  });
};