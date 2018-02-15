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
}

module.exports = CategoryController;