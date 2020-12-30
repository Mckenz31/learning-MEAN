const express = require('express'); //Importing
const mongoose = require('mongoose');

const bodyParser = require("body-parser");
const app = express(); //Big chain of middleware
const postModel = require('./models/post');
const postz = require('./routes/posts');

mongoose.connect("LINK TO MONGODB")
  .then(()=>{
    console.log("Connected to database")
  }).catch(()=>{
    console.log("Some error occurred");
  })

app.use(bodyParser.json());
//The browser requests for the favicon
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*"),
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Request-With, Content-type, Accept"),

  next();
})

app.get('/favicon.ico', function(req, res) {
  res.status(204);
  res.end();
});

app.use("/posts", postz);

module.exports = app;
