const express = require('express');
const {
    createPost, addLike, getPosts, getPost
} = require('../controllers/posts');

const router = express.Router();

const { protect } = require('../middleware/auth');



router.post('/', protect, createPost);
router.get('/', protect, getPosts);
router.get('/:id', protect, getPost);

router.put('/like/:id', protect, addLike);


module.exports = router;
