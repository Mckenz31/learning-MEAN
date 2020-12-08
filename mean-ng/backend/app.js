const express = require('express'); //Importing
const bodyParser = require("body-parser");
const app = express(); //Big chain of middleware

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

app.post('/posts',(req,res,next) => {
  const postRecieved = req.body;
  res.status(201).json({
    message: "Post created"
  })
  console.log(postRecieved);
})

app.use('/posts',(req, res, next) => {
  const posts = [
    {id:"jsndj23", title:"First Post", content: "This is my first post"},
    {id:'edfjn32', title:"Second Post", content: "This is my second post"},
    {id:'eoskdo1', title:"Third Post", content: "This is my third post"}
  ]
  res.status(200).json({
    message: "Fetched Posts",
    posts: posts
  });
});

module.exports = app;
