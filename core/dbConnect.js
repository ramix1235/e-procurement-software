import nconf from 'nconf';
import mongoose from 'mongoose';

require('mongoose').Promise = Promise;

const databaseURI = nconf.get('databaseURI');

mongoose.connect(databaseURI)
  .then(
    result => console.log(`Database connection successful: ${databaseURI}`),
    error => console.log(`Database connection (${databaseURI}) fail:\n ${error.stack}`)
  );
