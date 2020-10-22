const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {

    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];

  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route1', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return next(new ErrorResponse('Not authorized to access this route2', 401));
    }

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route3', 401));
  }
});

