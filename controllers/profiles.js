const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Profile = require('../models/Profile');
const mongoose = require('mongoose');

// @desc      Get current users profil
// @route     GET /api/v1/profiles/me
// @access    private
exports.getMyProfile = asyncHandler(async (req, res, next) => {


  const myProfile = await Profile.findOne({ user: req.user.id }).populate({
    path: 'user',
    select: 'name avatar'
  }
  ).populate({
    path: "experiences"
  }).populate({
    path: "educations"
  });
  res.status(200).json({
    success: true,
    data: myProfile
  })
});

// @desc      create  a user's profil
// @route     POST /api/v1/profiles/me
// @access    Private

exports.createMyProfile = asyncHandler(async (req, res, next) => {

  const { company, website, location, status, skills, bio, handle, youtube, twitter, facebook, instagram, linkedin } = req.body;
  const profilFields = {}
  profilFields.user = req.user.id;
  profilFields.company = req.body.company;
  profilFields.website = req.body.website;
  profilFields.location = req.body.location;
  profilFields.handle = req.body.handle;
  profilFields.status = req.body.status;
  profilFields.bio = req.body.bio;
  profilFields.skills = req.body.skills;
  profilFields.social = {}
  profilFields.social.youtube = req.body.youtube
  profilFields.social.twitter = req.body.twitter
  profilFields.social.facebook = req.body.facebook
  profilFields.social.linkedin = req.body.linkedin
  profilFields.social.instagram = req.body.instagram;
  console.log(skills);
  if (typeof req.body.skills !== 'undefined') {
    profilFields.skills = req.body.skills.split(',').map(skill => skill.trim());
    console.log(skills);
  }
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
  const profile = await Profile.findOne({ user: req.params.userId }).populate({ path: 'user', select: 'name avatar' }).populate({ path: 'educations' }).populate({ path: 'experiences' });
  if (!profile) {
    return next(
      new ErrorResponse(`Profile not found with id of ${req.params.userId}`, 404)
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
  const profile = await Profile.findOne({ user: req.user.id });
  await User.findByIdAndRemove(req.user.id);
  if (profile) {
    profile.remove();
  }
  res.status(200).json({
    success: true,
    msg: 'success'
  });
});

// @desc      Upload photo for user
// @route     PUT /api/v1/profiles/me/photo
// @access    Private
exports.userPhotoUpload = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const profile = await Profile.findOne({ user: req.user.id })
  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.user.id}`, 404)
    );
  }

  // Make sure user is user owner
  if (user.id.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this user`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${user._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Profile.findByIdAndUpdate(req.user.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});
