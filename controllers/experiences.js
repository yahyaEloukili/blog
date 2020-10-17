const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Experience = require('../models/Experience');
const mongoose = require('mongoose');
const router = require('../routes/profile');




// @desc      Get experiences
// @route     GET /api/v1/experiences
// @route     GET /api/v1/profiles/:profileId/experiences
// @access    Public
exports.getExperiences = asyncHandler(async (req, res, next) => {
  if (req.params.profileId) {
    const experiences = await experience.find({ profile: req.params.profileId }).populate('user');

    return res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single experience
// @route     GET /api/v1/experiences/:id
// @access    Public
exports.getExperience = asyncHandler(async (req, res, next) => {
  const experience = await Experience.findById(req.params.id).populate({
    path: 'profil',
    select: 'name description'
  });

  if (!experience) {
    return next(
      new ErrorResponse(`No experience found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: experience
  });
});


// @desc      Add experience
// @route     POST /api/v1/profiles/:profilId/experiences
// @access    Private
exports.addExperience = asyncHandler(async (req, res, next) => {
  req.body.profil = req.params.profilId;
  req.body.user = req.user.id;

  const profil = await Profil.findById(req.params.profilId);

  if (!profil) {
    return next(
      new ErrorResponse(
        `No profil with the id of ${req.params.profilId}`,
        404
      )
    );

  }
  const experience = await Experience.create(req.body);

  res.status(201).json({
    success: true,
    data: experience
  });
})
// @desc      Update experience
// @route     PUT /api/v1/experiences/:id
// @access    Private
exports.updateExperience = asyncHandler(async (req, res, next) => {
  let experience = await Experience.findById(req.params.id);

  if (!experience) {
    return next(
      new ErrorResponse(`No experience with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure experience belongs to user or user is admin
  // && req.user.role !== 'admin'
  if (experience.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update experience`, 401));
  }

  experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: experience
  });
});

// @desc      Delete experience
// @route     DELETE /api/v1/experiences/:id
// @access    Private
exports.deleteExperience = asyncHandler(async (req, res, next) => {
  const experience = await Experience.findById(req.params.id);

  if (!experience) {
    return next(
      new ErrorResponse(`No experience with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure experience belongs to user or user is admin
  // && req.user.role !== 'admin'
  if (experience.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update experience`, 401));
  }

  await experience.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
