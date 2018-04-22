/* eslint-disable no-underscore-dangle */
import BaseController from './baseController';
import Supplier from '../models/supplier';
import Product from '../models/product';

export default class SupplierController extends BaseController {
  static addSupplier(req, res) {
    const newSupplier = new Supplier({
      name: req.body.supplier.name,
      address: req.body.supplier.address,
      telephone: req.body.supplier.telephone,
      products: req.body.supplier.products,
    });

    newSupplier.save((err, supplier) => {
      // if (err) return super.newError(400, err.message);
      if (err) {
        console.log('Save failed!');
        return res.status(400).send({
          success: false,
          message: 'failed',
        });
      }

      if (newSupplier.products.length) {
        newSupplier.products.forEach((product) => {
          Product.findByIdAndUpdate(
            product.product,
            { $push: { suppliers: { supplier: newSupplier._id, price: product.price } } },
            (error, item) => {
              if (error) {
                console.log('Save failed!');
                return res.status(400).send({
                  success: false,
                  message: 'failed',
                });
              }
              return res;
            }
          );
        });
      }

      console.log('Save successfully!');
      this.getSuppliers(req, res);
      return res;
    });
  }

  static editSupplier(req, res) {
    const editingSupplier = new Supplier({
      _id: req.body.supplier._id,
      name: req.body.supplier.name,
      address: req.body.supplier.address,
      telephone: req.body.supplier.telephone,
      products: req.body.supplier.products,
    });

    Supplier.findByIdAndUpdate(editingSupplier._id, editingSupplier, (err, supplier) => {
      if (err) {
        console.log('Edit failed!');
        return res.status(400).send({
          success: false,
          message: 'failed',
        });
      }

      const editPromise = new Promise((resolve, reject) => {
        if (!supplier.products.length > 0) resolve(res);
        supplier.products.forEach((product) => {
          Product.findByIdAndUpdate(
            product.product,
            { $pull: { suppliers: { supplier: supplier._id } } },
            (error, item) => {
              if (error) {
                console.log('Edit failed!');
                reject(res.status(400).send({
                  success: false,
                  message: 'failed',
                }));
              }
              resolve(res);
            }
          );
        });
      });

      editPromise
        .then(() => {
          if (editingSupplier.products.length > 0) {
            editingSupplier.products.forEach((product) => {
              Product.findByIdAndUpdate(
                product.product,
                { $push: { suppliers: { supplier: editingSupplier._id, price: product.price } } },
                (error, item) => {
                  if (error) {
                    console.log('Edit failed!');
                    return res.status(400).send({
                      success: false,
                      message: 'failed',
                    });
                  }
                  return res;
                }
              );
            });
          }
        });

      console.log('Edit successfully!');
      this.getSuppliers(req, res);
      return res;
    });
  }

  static deleteSupplier(req, res) {
    const deletingSupplier = {
      _id: req.body.supplier._id,
    };

    Supplier.findByIdAndRemove(deletingSupplier._id, (err, supplier) => {
      if (err) {
        console.log('Delete failed!');
        return res.status(400).send({
          success: false,
          message: 'failed',
        });
      }

      supplier.products.forEach((product) => {
        Product.findByIdAndUpdate(
          product.product,
          { $pull: { suppliers: { supplier: deletingSupplier._id } } },
          (error, item) => {
            if (error) {
              console.log('Delete failed!');
              return res.status(400).send({
                success: false,
                message: 'failed',
              });
            }
            return res;
          }
        );
      });

      console.log('Delete successfully!');
      this.getSuppliers(req, res);
      return res;
    });
  }

  static getSuppliers(req, res) {
    Supplier.find({})
      .populate('products.product')
      .exec((err, suppliers) => {
        if (err) throw err;
        res.send(suppliers);
      });
  }
}
