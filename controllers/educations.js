const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Education = require('../models/Education');
const mongoose = require('mongoose');
const router = require('../routes/profiles');




// @desc      Get educations
// @route     GET /api/v1/educations
// @route     GET /api/v1/educations/profiles/:profileId
// @access    Public
exports.getEducations = asyncHandler(async (req, res, next) => {
  if (req.params.profileId) {
    const educations = await Education.find({ profile: req.params.profileId }).populate('user');

    return res.status(200).json({
      success: true,
      count: educations.length,
      data: educations
    });
  } else {

    res.status(200).json(res.advancedResults);
  }

});

// @desc      Get single education
// @route     GET /api/v1/educations/:id
// @access    Public
exports.getEducation = asyncHandler(async (req, res, next) => {
  const education = await Education.findById(req.params.id).populate({
    path: 'user',
    select: 'name avatar'
  });

  if (!education) {
    return next(
      new ErrorResponse(`No education found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: education
  });
});


// @desc      Add education
// @route     POST /api/v1/educations/profiles/:profilId
// @access    Private
exports.addEducation = asyncHandler(async (req, res, next) => {
  req.body.profile = req.params.profileId;
  req.body.user = req.user.id;

  const profile = await Profile.findById(req.params.profileId);

  if (!profile) {
    return next(
      new ErrorResponse(
        `No profile with the id of ${req.params.profileId}`,
        404
      )
    );

  }
  const education = await Education.create(req.body);

  res.status(201).json({
    success: true,
    data: education
  });
})
// @desc      Update education
// @route     PUT /api/v1/educations/:id
// @access    Private
exports.updateEducation = asyncHandler(async (req, res, next) => {
  let education = await Education.findById(req.params.id);

  if (!education) {
    return next(
      new ErrorResponse(`No education with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure education belongs to user
  if (education.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update education`, 401));
  }

  education = await Education.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: education
  });
});

// @desc      Delete education
// @route     DELETE /api/v1/educations/:id
// @access    Private
exports.deleteEducation = asyncHandler(async (req, res, next) => {
  const education = await Education.findById(req.params.id);

  if (!education) {
    return next(
      new ErrorResponse(`No education with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure education belongs to user or user is admin
  // && req.user.role !== 'admin'
  if (education.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to update education`, 401));
  }

  await education.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
