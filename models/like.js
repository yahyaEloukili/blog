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

module.exports = mongoose.model('Like', LikeSchema);
