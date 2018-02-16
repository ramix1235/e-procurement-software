const BaseController = require('./baseController');
const Currency = require('../models/currency');

class CurrencyController extends BaseController {
  static getCurrencies(req, res, next) {
    Currency.find({})
      .then(currencies => {
        res.send(currencies);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = CurrencyController;