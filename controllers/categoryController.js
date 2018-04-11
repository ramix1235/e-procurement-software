/* eslint-disable no-underscore-dangle */
import BaseController from './baseController';
import Category from '../models/category';
import Product from '../models/product';

export default class CategoryController extends BaseController {
  static addCategory(req, res) {
    const newCategory = new Category({
      name: req.body.category.name,
    });

    newCategory.save((err, category) => {
      // if (err) return super.newError(400, err.message);
      if (err) {
        console.log('Save failed!');
        return res.status(400).send({
          success: false,
          message: 'failed',
        });
      }
      console.log('Save successfully!');
      this.getCategories(req, res);
      return res;
    });
  }

  static editCategory(req, res) {
    const editingCategory = new Category({
      _id: req.body.category._id,
      name: req.body.category.name,
    });

    Category.findByIdAndUpdate(editingCategory._id, editingCategory, (err, category) => {
      if (err) {
        console.log('Edit failed!');
        return res.status(400).send({
          success: false,
          message: 'failed',
        });
      }

      console.log('Edit successfully!');
      this.getCategories(req, res);
      return res;
    });
  }

  static deleteCategory(req, res) {
    const deletingCategory = {
      _id: req.body.category._id,
    };

    Product.find({ category: deletingCategory._id })
      .then((products) => {
        if (products.length) {
          console.log('Delete failed!');
          return res.status(400).send({
            success: false,
            message: 'failed',
          });
        }
        Category.findByIdAndRemove(deletingCategory._id, (err, category) => {
          if (err) {
            console.log('Delete failed!');
            return res.status(400).send({
              success: false,
              message: 'failed',
            });
          }
          console.log('Delete successfully!');
          this.getCategories(req, res);
          return res;
        });
        return res;
      });
  }

  static getCategories(req, res, next) {
    // const materialProjection = {
    //   _id: false
    // };

    Category.find({}/* , materialProjection */)
      .then((categories) => {
        res.send(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
