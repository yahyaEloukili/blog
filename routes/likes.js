const express = require('express');
const {
  addLike, unlike
} = require('../controllers/likes');
const router = express.Router();

const { protect } = require('../middleware/auth');



router
  .route('/posts/:postId')
  .post(protect, addLike);

router
  .route('/:id')
  .delete(protect, unlike);
// router
//   .route('/:id')
//   .get(getEducation)
//   .put(protect, updateEducation)
//   .delete(protect, deleteEducation);

module.exports = router;
