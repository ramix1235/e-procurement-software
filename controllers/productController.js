const BaseController = require('./baseController');
const Product = require('../models/product');

class ProductController extends BaseController {
  static getProducts(req, res, next) {
    Product.find({})
      .populate('category')
      .exec((err, products) => {
        if (err) throw err;
        res.send(products);
      });
    // Product.find({})
    //   .then(products => {
    //     res.send(products);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
}

module.exports = ProductController;