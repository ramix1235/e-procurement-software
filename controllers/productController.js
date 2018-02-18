const BaseController = require('./baseController');
const Product = require('../models/product');
const Supplier = require('../models/supplier');

class ProductController extends BaseController {
  static getProducts(req, res) {
    Product.find({})
      .populate('category currency')
      .populate({
        path: 'suppliers',
        model: Supplier
      })
      .exec((err, products) => {
        if (err) throw err;
        res.send(products);
      });
  }

  static addProduct(req, res) {
    const newProduct = new Product({
      name: req.body.product.name,
      vendorCode: req.body.product.vendorCode,
      category: req.body.product.category,
      price: req.body.product.price,
      currency: req.body.product.currency,
      suppliers: req.body.product.suppliers
    });

    if (!newProduct.suppliers.length) {
      console.log('Save failed!');
      return res.status(400).send({
        success: false,
        message: 'failed'
      });
    }

    newProduct.save((err, product) => {
      // if (err) return super.newError(400, err.message);
      if (err) {
        console.log('Save failed!');
        return res.status(400).send({
          success: false,
          message: 'failed'
        });
      }

      newProduct.suppliers.forEach(item => {
        Supplier.findByIdAndUpdate(item,
          { '$push': { 'products': newProduct._id } },
          (err, supplier) => {
            if (err) {
              console.log('Save failed!');
              return res.status(400).send({
                success: false,
                message: 'failed'
              });
            }
          }
        );
      });

      console.log('Save succesfully!');
      this.getProducts(req, res);
    });
  }

  static editProduct(req, res) {
    const editingProduct = new Product({
      _id: req.body.product._id,
      name: req.body.product.name,
      vendorCode: req.body.product.vendorCode,
      category: req.body.product.category,
      price: req.body.product.price,
      currency: req.body.product.currency,
      suppliers: req.body.product.suppliers
    });

    if (!editingProduct.suppliers.length) {
      console.log('Save failed!');
      return res.status(400).send({
        success: false,
        message: 'failed'
      });
    }

    Product.findByIdAndUpdate(editingProduct._id, editingProduct, (err, product) => {
      if (err) {
        console.log('Edit failed!');
        return res.status(400).send({
          success: false,
          message: 'failed'
        });
      }
      // console.log(product.suppliers);
      product.suppliers.forEach(item => {
        Supplier.findByIdAndUpdate(item,
          { '$pull': { 'products': product._id } },
          (err, supplier) => {
            if (err) {
              console.log('Edit failed!');
              return res.status(400).send({
                success: false,
                message: 'failed'
              });
            }
          }
        );
      });

      editingProduct.suppliers.forEach(item => {
        Supplier.findByIdAndUpdate(item,
          { '$push': { 'products': editingProduct._id } },
          { 'new': true, 'upsert': true },
          (err, supplier) => {
            if (err) {
              console.log('Edit failed!');
              return res.status(400).send({
                success: false,
                message: 'failed'
              });
            }
          }
        );
      });

      console.log('Edit succesfully!');
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

      product.suppliers.forEach(item => {
        Supplier.findByIdAndUpdate(item,
          { '$pull': { 'products': product._id } },
          (err, supplier) => {
            if (err) {
              console.log('Delete failed!');
              return res.status(400).send({
                success: false,
                message: 'failed'
              });
            }
          }
        );
      });

      console.log('Delete succesfully!');
      this.getProducts(req, res);
    });
  }
}

module.exports = ProductController;