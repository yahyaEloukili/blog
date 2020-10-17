const express = require('express');
const {
  addExperience, deleteExperience, updateExperience, getExperience, getExperiences
} = require('../controllers/experiences');
const router = express.Router();
const Experience = require('../models/Experience')
const { protect } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');


router
  .route('/profiles/:profileId')
  .get(
    advancedResults(Experience, {
      path: 'user'
    }),
    getExperiences
  )
  .post(protect, addExperience);
router
  .route('/:id')
  .get(getExperience)
  .put(protect, updateExperience)
  .delete(protect, deleteExperience);

module.exports = router;
