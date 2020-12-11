//npm install --save mongoose
const mongoose = require('mongoose');

//Setting a Schema - Blueprint
const postSchema = mongoose.Schema({
  title: {type:String, required:true},
  content: {type:String, required:true}
})

//Mongoose needs a model to work with the blueprint, and create models
module.exports= mongoose.model('Post', postSchema);

