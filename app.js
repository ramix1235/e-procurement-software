const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const bodyParser = require('body-parser');
// const PORT = nconf.get('port');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./middleware/assetsData'));

require('./core/config');
require('./core/dbConnect');
require('./routes')(app, {});

app.use('/public/', express.static(path.resolve(__dirname, 'public')));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('layout extractScripts', true);

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});