/* eslint-disable no-underscore-dangle */
import BaseController from './baseController';
import Order from '../models/order';

export default class OrderController extends BaseController {
  static addOrder(req, res) {
    const newOrder = new Order({
      name: req.body.order.name,
      startDate: req.body.order.startDate,
      endDate: req.body.order.endDate,
      status: req.body.order.status,
      data: req.body.order.data,
    });

    newOrder.save((err, order) => {
      // if (err) return super.newError(400, err.message);
      if (err) {
        console.log('Save failed!');
        return res.status(400).send({
          success: false,
          message: 'failed',
        });
      }
      console.log('Save successfully!');
      this.getOrders(req, res);
      return res;
    });
  }

  static editOrder(req, res) {
    const editingOrder = new Order({
      _id: req.body.order._id,
      name: req.body.order.name,
      startDate: req.body.order.startDate,
      endDate: req.body.order.endDate,
      status: req.body.order.status,
      data: req.body.order.data,
    });

    Order.findByIdAndUpdate(editingOrder._id, editingOrder, (err, order) => {
      if (err) {
        console.log('Edit failed!');
        return res.status(400).send({
          success: false,
          message: 'failed',
        });
      }

      console.log('Edit successfully!');
      this.getOrders(req, res);
      return res;
    });
  }

  static deleteOrder(req, res) {
    const deletingOrder = {
      _id: req.body.order._id,
    };

    Order.findByIdAndRemove(deletingOrder._id, (err, order) => {
      if (err) {
        console.log('Delete failed!');
        return res.status(400).send({
          success: false,
          message: 'failed',
        });
      }
      console.log('Delete successfully!');
      this.getOrders(req, res);
      return res;
    });
  }

  static getOrders(req, res, next) {
    // const materialProjection = {
    //   _id: false
    // };

    Order.find({}/* , materialProjection */)
      .then((orders) => {
        res.send(orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
