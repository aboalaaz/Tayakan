const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc      Get Sorted users by points
// @route     Get /api/v1/auth/users/
// @access    Private/Admin
exports.getUsersByPoints = asyncHandler(async (req, res, next) => {
  let usersbypoint = await User.find({})
    .select('name points username')
    .sort('-points')
    .exec();
  res.status(200).json({
    success: true,
    data: usersbypoint,
  });
});
