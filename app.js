
import express from 'express';
import engine from 'ejs-mate';
// import engine from 'ejs-locals';
import path from 'path';
import bodyParser from 'body-parser';

import router from './routes';

import assetsData from './middleware/assetsData';
import './core/config';
import './core/dbConnect';

// const PORT = nconf.get('port');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(assetsData);


// router
router(app, {});

app.use('/public/', express.static(path.resolve(__dirname, 'public')));
// app.use(express.static(path.resolve(__dirname, '/public')));

app.engine('ejs', engine);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.set('layout extractScripts', true);

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
