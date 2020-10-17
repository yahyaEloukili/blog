const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Post = require('../models/Post');
const mongoose = require('mongoose');

// @desc      Get current users post// @route     GET /api/v1/posts/me
// @access    private
exports.getMyPosts = asyncHandler(async (req, res, next) => {
  const myPost = await Post.find({ user: req.user.id }).populate({
    path: 'user',
    select: 'name avatar'
  });
  if (!myPost) {
    return new ErrorResponse(`There is no post of this user`, 404);
  }
  res.status(200).json({
    success: true,
    data: myPost
  })
});

// @desc      create  a user's post// @route     POST /api/v1/posts/me
// @access    Private

exports.createMyPost = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const newPost = {
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user.id
  }
  const post = await Post.create(newPost);


  res.status(200).json({
    success: true,
    data: post
  });

})

// @desc      get  all posts
// @route     get /api/v1/posts
// @access    Public
exports.getPosts = asyncHandler(async (req, res, next) => {


  res.status(200).json(res.advancedResults);
});

// @desc      get  a post of user
// @route     get /api/v1/posts/users/:userId
// @access    Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findOne({ user: req.params.userId }).populate({ path: 'user', select: 'name avatar' });
  if (!post) {
    return next(
      new ErrorResponse(`post not found with id of ${req.params.userId}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: post
  });
});

// @desc      delete  a post of user
// @route     delete /api/v1/posts/:id
// @access    Private
exports.deleteMyPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  //check user
  if (post.user.toString() !== req.user.id) {
    return (new ErrorResponse(`user not authorized`, 404));
  }
  await post.remove();
  res.status(200).json({
    success: true,
    data: {}
  });
});

