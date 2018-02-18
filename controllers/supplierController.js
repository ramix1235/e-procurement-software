const BaseController = require('./baseController');
const Supplier = require('../models/supplier');
const Product = require('../models/product');

class SupplierController extends BaseController {
  static getSuppliers(req, res) {
    Supplier.find({})
      .populate({
        path: 'products',
        model: Product,
        populate: {
          path: 'category currency'
        }
      })
      .exec((err, suppliers) => {
        if (err) throw err;
        res.send(suppliers);
      });
  }

  static addSupplier(req, res) {
    const newSupplier = new Supplier({
      name: req.body.supplier.name,
      address: req.body.supplier.address,
      telephone: req.body.supplier.telephone,
      products: req.body.supplier.products
    });

    newSupplier.save((err, supplier) => {
      // if (err) return super.newError(400, err.message);
      if (err) {
        console.log('Save failed!');
        return res.status(400).send({
          success: false,
          message: 'failed'
        });
      }

      if (newSupplier.products.length) {
        newSupplier.products.forEach(item => {
          Product.findByIdAndUpdate(item,
            { '$push': { 'suppliers': newSupplier._id } },
            // { 'new': true, 'upsert': true },
            (err, product) => {
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
      }

      console.log('Save succesfully!');
      this.getSuppliers(req, res);
    });
  }

  static editSupplier(req, res) {
    const editingSupplier = new Supplier({
      _id: req.body.supplier._id,
      name: req.body.supplier.name,
      address: req.body.supplier.address,
      telephone: req.body.supplier.telephone,
      products: req.body.supplier.products
    });

    Supplier.findByIdAndUpdate(editingSupplier._id, editingSupplier, (err, supplier) => {
      if (err) {
        console.log('Edit failed!');
        return res.status(400).send({
          success: false,
          message: 'failed'
        });
      }

      supplier.products.forEach(item => {
        Product.findByIdAndUpdate(item,
          { '$pull': { 'suppliers': supplier._id } },
          // { 'new': true, 'upsert': true },
          (err, product) => {
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

      if (editingSupplier.products.length) {
        editingSupplier.products.forEach(item => {
          Product.findByIdAndUpdate(item,
            { '$push': { 'suppliers': editingSupplier._id } },
            // { 'new': true, 'upsert': true },
            (err, product) => {
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
      }

      console.log('Edit succesfully!');
      this.getSuppliers(req, res);
    });
  }
}

module.exports = SupplierController;