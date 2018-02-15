const fs = require('fs');
const path = require('path');
const modelsDirPath = path.join(appRoot, 'models');

// init all DB models
fs.readdir(modelsDirPath, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    require(path.join(__dirname, file));
  });
});