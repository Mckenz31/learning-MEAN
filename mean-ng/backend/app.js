const express = require('express'); //Importing
const mongoose = require('mongoose');

const bodyParser = require("body-parser");
const app = express(); //Big chain of middleware
const postModel = require('./models/post');

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

//Getting the posts from angular and sending it to mongoDB
app.post('/posts',(req,res,next) => {
  const post = new postModel({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(response => {
    res.status(201).json({
      message: "Post Created",
      postId: response._id
    })
  });
  console.log(post);
})

app.get('/posts',(req, res, next) => {
  postModel.find().then(postData => {
    res.status(200).json({
      message: "Fetched Posts",
      posts: postData
    });
  });
});

app.delete("/posts/:id", (req, res, next) => {
  postModel.deleteOne({_id: req.params.id}).then(data => {
    res.status(200).json({ message: "Post deleted!" });
    console.log(data);
  })
})

module.exports = app;
