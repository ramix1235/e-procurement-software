const currencyController = require('../controllers/currencyController');

module.exports = (app) => {
  app.get('/api/currency/getCurrencies', (req, res) => {
    currencyController.getCurrencies(req, res);
  });

  app.post('/api/currency/addCurrency', (req, res) => {
    currencyController.addCurrency(req, res);
  });
};