const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Post = require('../models/Post');
const mongoose = require('mongoose');
const router = require('../routes/profile');



// @desc      create a post
// @route     POST /api/v1/posts
// @access    private
exports.createPost = asyncHandler(async (req, res, next) => {

  const user = await User.findById(req.user.id)
  const newPost = {
    text: req.body.text,
    user: req.user.id,
    name: user.name,
    avatar: user.avatar,
  }
  const post = await Post.create(newPost);
  res.status(200).json({
    success: true,
    data: post
  });
});


// @desc      get posts
// @route     get /api/v1/posts
// @access    private
exports.getPosts = asyncHandler(async (req, res, next) => {

  const posts = await Post.find()

  res.status(200).json({
    success: true,
    data: posts
  });
});

// @desc      get a post
// @route     get /api/v1/posts/:id
// @access    private
exports.getPost = asyncHandler(async (req, res, next) => {

  const post = await Post.findById(req.params.id)

  res.status(200).json({
    success: true,
    data: post
  });
});

// @desc      get a post
// @route     get /api/v1/posts/:id
// @access    private
exports.deletePost = asyncHandler(async (req, res, next) => {

  const post = await Post.findById(req.params.id)

  //check user
  if (post.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`Unauthorized to delete this post`, 401)
    );
  }
  await post.remove();
  res.status(200).json({
    success: true,
    data: {

    }
  });
});
















