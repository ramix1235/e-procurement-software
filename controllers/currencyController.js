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

  static addCurrency(req, res) {
    const newCurrency = new Currency({
      name: req.body.currency.name
    });

    newCurrency.save((err, currency) => {
      // if (err) return super.newError(400, err.message);
      if (err) {
        console.log('Save failed!');
        return res.status(400).send({
          success: false,
          message: 'failed'
        });
      }
      console.log('Save succesfully!');
      this.getCurrencies(req, res);
    });
  }
}

module.exports = CurrencyController;