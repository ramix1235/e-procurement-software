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
      // if (err) return super.newError(400, err.message);
      if (err) {
        console.log('Save failed!');
        return res.status(400).send({
          success: false,
          message: 'failed'
        });
      }
      console.log('Save succesfully!');
      this.getProducts(req, res);
    });
  }

  static deleteProduct(req, res) {
    const deletingProduct = {
      _id: req.body.product._id
    };

    Product.findByIdAndRemove(deletingProduct._id, (err, product) => {
      if (err) {
        console.log('Delete failed!');
        return res.status(400).send({
          success: false,
          message: 'failed'
        });
      }
      console.log('Delete succesfully!');
      this.getProducts(req, res);
    });
  }
}

module.exports = ProductController;