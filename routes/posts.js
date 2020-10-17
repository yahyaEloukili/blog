const express = require('express');
const {
  createPost, getPosts, getPost
} = require('../controllers/posts');

const router = express.Router();

const { protect } = require('../middleware/auth');



router.post('/', protect, createPost);
router.get('/', protect, getPosts);
router.get('/:id', protect, getPost);



module.exports = router;
