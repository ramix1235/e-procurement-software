export default (req, res, next) => {
  const assetsData = require('../public/assets/assets.json');
  const assetsUrl = process.env.NODE_ENV === 'production' ? '/public/assets/' : 'http://localhost:8050/';
  // const assetsUrl = process.env.NODE_ENV === 'production' ? '/assets/' : 'http://localhost:8050/public/assets/';

  res.locals.assetsData = {
    cssUrl: `${assetsUrl}${assetsData.main.css}`,
    jsUrl: `${assetsUrl}${assetsData.main.js}`,
  };

  next();
};
