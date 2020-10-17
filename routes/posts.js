const express = require('express');
const {
  getMyPosts, createMyPost, getPosts, getPost, deleteMyPost
} = require('../controllers/posts');


const router = express.Router();
const Post = require('../models/Post')
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');


router.route('/me').get(protect, getMyPosts).delete(protect).post(protect, createMyPost);



router.get('/', advancedResults(Post, {
  path: 'user',
  select: 'name avatar'
}), getPosts);

router.get('/users/:userId', getPost);
router.delete('/:id', protect, deleteMyPost)

module.exports = router;
