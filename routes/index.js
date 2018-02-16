module.exports = (app) => {
  require('./categoryRoutes')(app);
  require('./currencyRoutes')(app);
  require('./productRoutes')(app);

  app.get(['/'], (req, res) => {
    res.render('layout');
  });
};