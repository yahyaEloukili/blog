const express = require('express');
const {
  addExperience, deleteExperience, updateExperience, getExperience, getExperiences
} = require('../controllers/experiences');
const router = express.Router();

const { protect } = require('../middleware/auth');



router
  .route('/')
  .get(
    advancedResults(Review, {
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
