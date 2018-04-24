import categoryRoutes from './categoryRoutes';
import currencyRoutes from './currencyRoutes';
import productRoutes from './productRoutes';
import supplierRoutes from './supplierRoutes';
import orderRoutes from './orderRoutes';

export default (app) => {
  categoryRoutes(app);
  currencyRoutes(app);
  productRoutes(app);
  supplierRoutes(app);
  orderRoutes(app);

  app.get(['/', '/inventory', '/charts', '/orders'], (req, res) => {
    res.render('layout');
  });
};
