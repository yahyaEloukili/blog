const express = require('express');
const {
    getMyProfil, createProfile, getProfils, getProfil, deleteProfil, addExperience, deleteExperience
} = require('../controllers/profile');

const router = express.Router();

const { protect } = require('../middleware/auth');


router.get('/me', protect, getProfil);

router.post('/', protect, createProfile);
router.put('/experience', protect, addExperience);
router.delete('/experience/:experienceId', protect, deleteExperience);
router.delete('/', protect, deleteProfil);

router.get('/', getProfils);
router.get('/users/:userId', getProfil);


module.exports = router;
