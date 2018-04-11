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
        newSupplier.products.forEach((item) => {
          Product.findByIdAndUpdate(
            item,
            { $push: { suppliers: newSupplier._id } },
            (error, product) => {
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

    // Supplier.findById(editingSupplier._id)
    //   .populate({
    //     path: 'products',
    //     model: Product
    //   })
    //   .exec((err, supplier) => {
    //     if (err) throw err;
    //     supplier.products.forEach(product => {
    //       if (product.suppliers.length < 2) {
    //         console.log('Edit failed!');
    //         return res.status(400).send({
    //           success: false,
    //           message: 'failed'
    //         });
    //       }
    //     });
    //   });

    Supplier.findByIdAndUpdate(editingSupplier._id, editingSupplier, (err, supplier) => {
      if (err) {
        console.log('Edit failed!');
        return res.status(400).send({
          success: false,
          message: 'failed',
        });
      }
      // console.log(supplier.products);
      supplier.products.forEach((item) => {
        Product.findByIdAndUpdate(
          item,
          { $pull: { suppliers: supplier._id } },
          (error, product) => {
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

      if (editingSupplier.products.length) {
        editingSupplier.products.forEach((item) => {
          Product.findByIdAndUpdate(
            item,
            { $push: { suppliers: editingSupplier._id } },
            (error, product) => {
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

      supplier.products.forEach((item) => {
        Product.findByIdAndUpdate(
          item,
          { $pull: { suppliers: supplier._id } },
          (error, product) => {
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
      .populate({
        path: 'products',
        model: Product,
        populate: {
          path: 'category currency',
        },
      })
      .exec((err, suppliers) => {
        if (err) throw err;
        res.send(suppliers);
      });
  }
}
