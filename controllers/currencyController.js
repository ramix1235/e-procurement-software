/* eslint-disable no-underscore-dangle */
import BaseController from './baseController';
import Currency from '../models/currency';
import Product from '../models/product';

export default class CurrencyController extends BaseController {
  static addCurrency(req, res) {
    const newCurrency = new Currency({
      name: req.body.currency.name,
    });

    newCurrency.save((err, currency) => {
      // if (err) return super.newError(400, err.message);
      if (err) {
        console.log('Save failed!');
        return res.status(400).send({
          success: false,
          message: 'failed',
        });
      }
      console.log('Save successfully!');
      this.getCurrencies(req, res);
      return res;
    });
  }

  static editCurrency(req, res) {
    const editingCurrency = new Currency({
      _id: req.body.currency._id,
      name: req.body.currency.name,
    });

    Currency.findByIdAndUpdate(editingCurrency._id, editingCurrency, (err, currency) => {
      if (err) {
        console.log('Edit failed!');
        return res.status(400).send({
          success: false,
          message: 'failed',
        });
      }
      console.log('Edit successfully!');
      this.getCurrencies(req, res);
      return res;
    });
  }

  static deleteCurrency(req, res) {
    const deletingCurrency = {
      _id: req.body.currency._id,
    };

    Product.find({ currency: deletingCurrency._id })
      .then((products) => {
        if (products.length) {
          console.log('Delete failed!');
          return res.status(400).send({
            success: false,
            message: 'failed',
          });
        }
        Currency.findByIdAndRemove(deletingCurrency._id, (err, currency) => {
          if (err) {
            console.log('Delete failed!');
            return res.status(400).send({
              success: false,
              message: 'failed',
            });
          }
          console.log('Delete successfully!');
          this.getCurrencies(req, res);
          return res;
        });
        return res;
      });
  }

  static getCurrencies(req, res, next) {
    Currency.find({})
      .then((currencies) => {
        res.send(currencies);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
