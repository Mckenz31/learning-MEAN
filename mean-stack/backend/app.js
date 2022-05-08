const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const env = require('../src/environments/environment');

const Post = require('./models/post');

const app = express();

app.use(bodyParser.json());
mongoose.connect(MONGODB CONNECTION LINK);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(
    () => {
      res.status(201).json({
        message: "Successfully recieved",
        id: post._id
      });
    }
  );
  console.log(post._id);
})

app.get('/api/posts' ,(req, res, next) => {
  Post.find().then(document => {
    res.status(200).json({
      message: "Successfully sent",
      post: document
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(
    result => {
      console.log(result);
      res.status(200).json({message: "Successfully deleted"});
    }
  );
});

module.exports = app;
