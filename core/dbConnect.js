const mongoose = require('mongoose');
const databaseURI = nconf.get('databaseURI');

mongoose.Promise = global.Promise;

mongoose.connect(databaseURI)
  .then(
    result => {
      console.log(`Database connection successful: ${databaseURI}`);
    },
    error => {
      console.log(`Database connection (${databaseURI}) fail:\n ${error.stack}`);
    });

// module.exports = mongoose;