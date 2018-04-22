/* eslint-disable no-underscore-dangle */
import BaseController from './baseController';
import Product from '../models/product';
import Supplier from '../models/supplier';

export default class ProductController extends BaseController {
  static addProduct(req, res) {
    const newProduct = new Product({
      name: req.body.product.name,
      vendorCode: req.body.product.vendorCode,
      category: req.body.product.category,
      currency: req.body.product.currency,
      suppliers: req.body.product.suppliers,
    });

    // if (!newProduct.suppliers.length) {
    //   console.log('Save failed!');
    //   return res.status(400).send({
    //     success: false,
    //     message: 'failed',
    //   });
    // }

    newProduct.save((err, product) => {
      // if (err) return super.newError(400, err.message);
      if (err) {
        console.log('Save failed!');
        return res.status(400).send({
          success: false,
          message: 'failed',
        });
      }

      newProduct.suppliers.forEach((supplier) => {
        Supplier.findByIdAndUpdate(
          supplier.supplier,
          { $push: { products: { product: newProduct._id, price: supplier.price } } },
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

      console.log('Save successfully!');
      this.getProducts(req, res);
      return res;
    });
    return res;
  }

  static editProduct(req, res) {
    const editingProduct = new Product({
      _id: req.body.product._id,
      name: req.body.product.name,
      vendorCode: req.body.product.vendorCode,
      category: req.body.product.category,
      currency: req.body.product.currency,
      suppliers: req.body.product.suppliers,
    });

    Product.findByIdAndUpdate(editingProduct._id, editingProduct, (err, product) => {
      if (err) {
        console.log('Edit failed!');
        return res.status(400).send({
          success: false,
          message: 'failed',
        });
      }

      const editPromise = new Promise((resolve, reject) => {
        if (!product.suppliers.length > 0) resolve(res);
        product.suppliers.forEach((supplier) => {
          Supplier.findByIdAndUpdate(
            supplier.supplier,
            { $pull: { products: { product: product._id } } },
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
          if (editingProduct.suppliers.length > 0) {
            editingProduct.suppliers.forEach((supplier) => {
              Supplier.findByIdAndUpdate(
                supplier.supplier,
                { $push: { products: { product: editingProduct._id, price: supplier.price } } },
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
      this.getProducts(req, res);
      return res;
    });
    return res;
  }

  static deleteProduct(req, res) {
    const deletingProduct = {
      _id: req.body.product._id,
    };

    Product.findByIdAndRemove(deletingProduct._id, (err, product) => {
      if (err) {
        console.log('Delete failed!');
        return res.status(400).send({
          success: false,
          message: 'failed',
        });
      }

      product.suppliers.forEach((supplier) => {
        Supplier.findByIdAndUpdate(
          supplier.supplier,
          { $pull: { products: { product: deletingProduct._id } } },
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
      this.getProducts(req, res);
      return res;
    });
  }

  static getProducts(req, res) {
    Product.find({})
      .populate('category currency suppliers.supplier')
      .exec((err, products) => {
        if (err) throw err;
        res.send(products);
      });
  }
}
