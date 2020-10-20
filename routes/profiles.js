const express = require('express');
const {
  getMyProfile, createMyProfile, getProfiles, getProfile, deleteMyProfile
} = require('../controllers/profiles');


const router = express.Router();
const Profile = require('../models/Profile')
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');


router.route('/me').get(protect, getMyProfile).delete(protect, deleteMyProfile).post(protect, createMyProfile);



router.get('/', advancedResults(Profile, {
  path: 'user',
  select: 'name avatar'
}
  // , {
  //   path: 'educations'
  // }
), getProfiles);

router.get('/users/:userId', getProfile);


module.exports = router;
