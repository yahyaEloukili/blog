const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LikeSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post'
  },

  date: {
    type: Date,
    default: Date.now
  }
});
//preventing user for liking more than one post
LikeSchema.index({ post: 1, user: 1 }, { unique: true })
module.exports = mongoose.model('Like', LikeSchema);
