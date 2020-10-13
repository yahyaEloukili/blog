const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Profile = require('../models/Profile');


// @desc      Get current users profil
// @route     POST /api/v1/profile/me
// @access    Public
exports.getProfil = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findById(req.user.id).populate({ path: 'user', select: 'name avatar' });
    if (!profile) {
        return next(
            new ErrorResponse(`Profile not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({
        success: true,
        data: user
    });
});
