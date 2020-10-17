const express = require('express');
const {
  getMyProfile, createMyProfile, getProfiles, getProfile, deleteMyProfile
} = require('../controllers/profiles');


const router = express.Router();
const Profile = require('../models/Profile')
const advancedResults = require('../middleware/advancedResults');
// Include other resource routers
const experienceRouter = require('./experience');

// Re-route into other resource routers
router.use('/:profileId/experiences', experienceRouter);
const { protect } = require('../middleware/auth');


router.route('/me').get(protect, getMyProfile).delete(protect, deleteMyProfile).post(protect, createMyProfile);



router.get('/', advancedResults(Profile, {
  path: 'user',
  select: 'name avatar'
}), getProfils);

router.get('/users/:userId', getProfil);


module.exports = router;
