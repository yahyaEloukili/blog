const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Profile = require('../models/Profile');
const mongoose = require('mongoose');
const router = require('../routes/profile');

// @desc      Get current users profil
// @route     GET /api/v1/profiles/me
// @access    private
exports.getMyProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate({ path: 'user', select: 'name avatar' });
  if (!profile) {
    return next(
      new ErrorResponse(`Profile not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: profile
  });
});

// @desc      create  a user's profil
// @route     POST /api/v1/profiles/me
// @access    Private

exports.createMyProfile = asyncHandler(async (req, res, next) => {

  const { company, website, handle, location, status, skills, bio, githubusername, youtube, twitter, facebook, instagram, linkedin } = req.body;
  const profilFields = {}
  profilFields.user = req.user.id;
  profilFields.company = req.body.company;
  profilFields.handle = req.body.handle;
  profilFields.website = req.body.website;
  profilFields.location = req.body.location;
  profilFields.status = req.body.status;
  profilFields.bio = req.body.bio;
  profilFields.githubusername = req.body.githubusername;
  profilFields.skills = req.body.skills;
  profilFields.social = {}
  profilFields.social.youtube = req.body.youtube
  profilFields.social.twitter = req.body.twitter
  profilFields.social.facebook = req.body.facebook
  profilFields.social.linkedin = req.body.linkedin
  profilFields.social.instagram = req.body.instagram;
  let profil = await Profile.findOne({ user: req.user.id });
  if (profil) {
    profil = await Profile.findOneAndUpdate({ user: req.user.id }, profilFields, {
      new: true,
      runValidators: true
    })
  }
  else {
    profil = await Profile.create(profilFields);
  }


  res.status(200).json({
    success: true,
    data: profil
  });

})

// @desc      get  all profiles
// @route     get /api/v1/profiles
// @access    Public
exports.getProfiles = asyncHandler(async (req, res, next) => {


  res.status(200).json(res.advancedResults);
});

// @desc      get  a profile of user
// @route     get /api/v1/profiles/users/:userId
// @access    Public
exports.getProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.params.userId }).populate({ path: 'user', select: 'name avatar' });
  if (!profile) {
    return next(
      new ErrorResponse(`Profile not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: profile
  });
});

// @desc      delete  a profile of user
// @route     delete /api/v1/profiles/me
// @access    Private
exports.deleteMyProfile = asyncHandler(async (req, res, next) => {
  await Profile.findOneAndRemove({ user: req.user.id });
  await User.findByIdAndRemove(req.user.id);
  res.status(200).json({
    success: true,
    msg: 'success'
  });
});

