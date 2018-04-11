import nconf from 'nconf';
import path from 'path';

const configFilePath = process.env.NODE_ENV === 'production'
  ? path.resolve(__dirname, 'config.prod.json')
  : path.resolve(__dirname, 'config.dev.json');

nconf.argv()
  .env()
  .file({ file: configFilePath });
