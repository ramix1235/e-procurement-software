require('babel-core/register');
['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {});
require('babel-polyfill');
require('./app.js');

// handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(err.stack);
  process.exit(1);
});