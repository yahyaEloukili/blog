const express = require('express');
const {
  getMyProfile, createMyProfile, getProfiles, getProfile, deleteMyProfile, userPhotoUpload
} = require('../controllers/profiles');


const router = express.Router();
const Profile = require('../models/Profile')
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');


router.route('/me').get(protect, getMyProfile).delete(protect, deleteMyProfile).post(protect, createMyProfile);



router.get('/', advancedResults(Profile, {
  path: 'user'
}
  // , {
  //   path: 'educations'
  // }
), getProfiles);

router.get('/users/:userId', getProfile);
router.route('/me/photo').put(protect, userPhotoUpload)

module.exports = router;
