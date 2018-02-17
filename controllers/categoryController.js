const BaseController = require('./baseController');
const Category = require('../models/category');

class CategoryController extends BaseController {
  static getCategories(req, res, next) {
    // const materialProjection = {
    //   _id: false
    // };

    Category.find({}/* , materialProjection*/)
      .then(categories => {
        res.send(categories);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static addCategory(req, res) {
    const newCategory = new Category({
      name: req.body.category.name
    });

    newCategory.save((err, category) => {
      // if (err) return super.newError(400, err.message);
      if (err) {
        console.log('Save failed!');
        return res.status(400).send({
          success: false,
          message: 'failed'
        });
      }
      console.log('Save succesfully!');
      this.getCategories(req, res);
    });
  }

  static editCategory(req, res) {
    const editingCategory = new Category({
      _id: req.body.category._id,
      name: req.body.category.name
    });

    Category.findByIdAndUpdate(editingCategory._id, editingCategory, (err, category) => {
      if (err) {
        console.log('Edit failed!');
        return res.status(400).send({
          success: false,
          message: 'failed'
        });
      }
      console.log('Edit succesfully!');
      this.getCategories(req, res);
    });
  }
}

module.exports = CategoryController;