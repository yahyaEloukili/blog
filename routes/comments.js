const express = require('express');
const {
  addComment, deleteComment
} = require('../controllers/comments');
const router = express.Router();

const { protect } = require('../middleware/auth');



router
  .route('/posts/:postId')
  .post(protect, addComment);

router
  .route('/:id')
  .delete(protect, deleteComment);


module.exports = router;
