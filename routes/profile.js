const express = require('express');
const {
    getProfil
} = require('../controllers/profile');

const router = express.Router();

const { protect } = require('../middleware/auth');


router.get('/me', protect, getProfil);


module.exports = router;
