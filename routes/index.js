module.exports = (app) => {
  require('./categoryRoutes')(app);
  require('./productRoutes')(app);

  app.get(['/'], (req, res) => {
    res.render('layout');
  });
};