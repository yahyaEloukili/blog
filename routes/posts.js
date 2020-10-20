const express = require('express');
const {
  getMyPosts, createMyPost, getPosts, getPost, deleteMyPost, getPostById
} = require('../controllers/posts');


const router = express.Router();
const Post = require('../models/Post')
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');


router.route('/me').get(protect, getMyPosts).delete(protect).post(protect, createMyPost);



router.get('/', protect, advancedResults(Post,
  {
    path: 'comments'
  },

  {
    path: 'likes'
  }), getPosts);

router.get('/users/:userId', getPost);
router.route('/:id').delete(protect, deleteMyPost).get(protect, getPostById)

module.exports = router;
