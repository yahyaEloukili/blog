const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Profile = require('../models/Profile');
const mongoose = require('mongoose');
const router = require('../routes/profile');

// @desc      Get current users profil
// @route     GET /api/v1/profile/me
// @access    private
exports.getMyProfil = asyncHandler(async (req, res, next) => {
    console.log(req.user.id, "*****");
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
// @route     POST /api/v1/profile
// @access    Private

exports.createProfile = asyncHandler(async (req, res, next) => {

    const { company, website, handle, location, status, skills, bio, githubusername, youtube, twitter, facebook, instagram, linkedin } = req.body;
    const profilFields = {}
    profilFields.user = mongoose.Types.ObjectId(req.user.id);
    console.log(req.user.id,);
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
// @desc      get  all profils
// @route     get /api/v1/profile
// @access    Public
exports.getProfils = asyncHandler(async (req, res, next) => {
    const profiles = await Profile.find().populate({ path: 'user', select: 'name avatar' });
    res.status(200).json({
        success: true,
        data: profiles
    });
});

// @desc      get  a profile of user
// @route     get /api/v1/profile/users/:userId
// @access    Public
exports.getProfil = asyncHandler(async (req, res, next) => {
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
// @route     delete /api/v1/profile
// @access    Private
exports.deleteProfil = asyncHandler(async (req, res, next) => {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findByIdAndRemove(req.user.id);
    res.status(200).json({
        success: true,
        msg: 'success'
    });
});

// @desc      add experience to  a profile of user
// @route     delete /api/v1/profile/experience
// @access    Private
exports.addExperience = asyncHandler(async (req, res, next) => {
    const { title, company, location, from, to, current, description } = req.body;


    const newExp = {
        title, company, location, from, to, current, description

    };
    let profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    profile = await Profile.findOneAndUpdate({ user: req.user.id }, profile, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        data: profile
    });
});

// @desc      delete an experience from a profile
// @route     delete /api/v1/profile/experience/:experienceId
// @access    Private

exports.deleteExperience = asyncHandler(async (req, res, next) => {

    let profile = await Profile.findOne({ user: req.user.id });
    //get remove index
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.experienceId);
    profile.experience.splice(removeIndex, 1);
    await Profile.findOneAndUpdate({ user: req.user.id }, profile, {
        new: true,
        runValidators: true
    })


    res.status(200).json({
        success: true,
        data: profile
    });
});