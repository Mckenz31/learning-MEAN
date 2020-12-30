const express = require('express');
const postModel = require('../models/post');

const router = express.Router();

//Getting the posts from angular and sending it to mongoDB
router.post("",(req,res,next) => {
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

router.get("",(req, res, next) => {
  postModel.find().then(postData => {
    res.status(200).json({
      message: "Fetched Posts",
      posts: postData
    });
  });
});

router.delete("/:id", (req, res, next) => {
  postModel.deleteOne({_id: req.params.id}).then(data => {
    res.status(200).json({ message: "Post deleted!" });
    console.log(data);
  })
})

//Updating an existing post
router.put("/:id", (req, res, next) => {
  const upPost = new postModel({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
  postModel.updateOne({_id: req.params.id}, upPost).then(response => {
    res.status(200).json({message: "Post updated"});
  })
})

//Ensuring that the post details on the create page during edit mode remains on reload
//Basically getting the post that is to be editted
router.get("/:id", (req, res, next) => {
  postModel.findById({_id:req.params.id}).then(response => {
    if(response){
      res.status(200).json(response);
    }else{
      res.status(404);
    }
  })
});

module.exports = router;
