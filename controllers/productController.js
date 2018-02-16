const BaseController = require('./baseController');
const Product = require('../models/product');

class ProductController extends BaseController {
  static getProducts(req, res) {
    Product.find({})
      .populate('category currency')
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

  static addProduct(req, res) {
    const newProduct = new Product({
      name: req.body.product.name,
      vendorCode: req.body.product.vendorCode,
      category: req.body.product.category,
      price: req.body.product.price,
      currency: req.body.product.currency
    });

    newProduct.save((err, product) => {
      if (err) return super.newError(400, err.message);
      this.getProducts(req, res);
      console.log(`Saved succesfully! - ${product.name}`);
      return;
    });
  }
}

module.exports = ProductController;