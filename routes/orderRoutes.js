import orderController from '../controllers/orderController';

export default (app) => {
  app.get('/api/order/getOrders', (req, res) => {
    orderController.getOrders(req, res);
  });

  app.post('/api/order/addOrder', (req, res) => {
    orderController.addOrder(req, res);
  });

  app.post('/api/order/editOrder', (req, res) => {
    orderController.editOrder(req, res);
  });

  app.post('/api/order/deleteOrder', (req, res) => {
    orderController.deleteOrder(req, res);
  });

  app.post('/api/order/email', (req, res) => {
    orderController.sendOrderEmailToSupplier(req, res);
  });
};
