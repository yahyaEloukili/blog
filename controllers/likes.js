const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Post = require('../models/Post');
const Like = require('../models/Like');
const mongoose = require('mongoose');
const router = require('../routes/profiles');





// @desc      Add like
// @route     POST /api/v1/likes/posts/:postId
// @access    Private
exports.addLike = asyncHandler(async (req, res, next) => {
  req.body.post = req.params.postId;
  req.body.user = req.user.id;

  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(
      new ErrorResponse(
        `No post with the id of ${req.params.postId}`,
        404
      )
    );

  }
  const like = await Like.create(req.body);

  res.status(201).json({
    success: true,
    data: like
  });
})

// @desc      Delete like
// @route     DELETE /api/v1/likes/:id
// @access    Private
exports.unlike = asyncHandler(async (req, res, next) => {
  const like = await Like.findById(req.params.id);

  if (!like) {
    return next(
      new ErrorResponse(`No like with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure like belongs to user or user is admin
  // && req.user.role !== 'admin'
  if (like.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update like`, 401));
  }

  await like.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
