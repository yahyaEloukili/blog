const express = require('express');
const {
  addEducation, deleteEducation, updateEducation, getEducation, getEducations
} = require('../controllers/Educations');
const router = express.Router();
const Education = require('../models/Education')
const { protect } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');


router
  .route('/profiles/:profileId')
  .get(
    advancedResults(Education, {
      path: 'user'
    }),
    getEducations
  )
  .post(protect, addEducation);
router
  .route('/:id')
  .get(getEducation)
  .put(protect, updateEducation)
  .delete(protect, deleteEducation);

module.exports = router;
