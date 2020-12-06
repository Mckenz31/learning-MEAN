const express = require('express'); //Importing
const expApp = express(); //Big chain of middleware

//The browser requests for the favicon
expApp.get('/favicon.ico', function(req, res) {
  res.status(204);
  res.end();
});

expApp.use((req, res, next) => {
  console.log('Middleware');
  next();
});

expApp.use((req, res, next) => {
  res.send('Express');
});

module.exports = expApp;
