const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');
const router = require('../routes/profiles');





// @desc      Add Comment
// @route     POST /api/v1/Comments/posts/:postId
// @access    Private
exports.addComment = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  req.body.post = req.params.postId;
  req.body.user = req.user.id;
  req.body.name = user.name;
  req.body.avatar = user.avatar;
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(
      new ErrorResponse(
        `No post with the id of ${req.params.postId}`,
        404
      )
    );

  }
  const comment = await Comment.create(req.body);
  console.log(comment);

  res.status(201).json({
    success: true,
    data: comment
  });
})

// @desc      Delete comment
// @route     DELETE /api/v1/comments/:id
// @access    Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`No comment with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure comment belongs to user or user is admin
  // && req.user.role !== 'admin'
  if (comment.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update comment`, 401));
  }

  await comment.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
