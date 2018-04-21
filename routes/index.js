import categoryRoutes from './categoryRoutes';
import currencyRoutes from './currencyRoutes';
import productRoutes from './productRoutes';
import supplierRoute from './supplierRoute';

export default (app) => {
  categoryRoutes(app);
  currencyRoutes(app);
  productRoutes(app);
  supplierRoute(app);

  app.get(['/*'], (req, res) => {
    res.render('layout');
  });
};
