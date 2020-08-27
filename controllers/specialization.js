const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Specialization = require('../models/Specialization');

// @desc      Get all Specialization
// @route     GET /api/v1/Specialization
// @access    Private
exports.getSpecializations = asyncHandler(async (req, res, next) => {
  const specialization = await Specialization.find(req.query).populate({
    path: 'courses',
    select: 'name',
  });
  res.status(200).json({
    success: true,
    data: specialization,
  });
});

// @desc      Get single Specialization
// @route     GET /api/v1/Specialization
// @access    Private
exports.getSpecialization = asyncHandler(async (req, res, next) => {
  const specialization = await Specialization.findById(req.params.id).populate({
    path: 'courses',
    select: 'name',
  });

  if (!specialization) {
    return next(new ErrorResponse(`التخصص المطلوب غير موجود`, 404));
  }
  res.status(200).json({
    success: true,
    data: specialization,
  });
});

// @desc      Create new Specialization
// @route     POST /api/v1/Specialization
// @access    Private

exports.createSpecialization = asyncHandler(async (req, res, next) => {
  const specialization = await Specialization.create(req.body);

  res.status(201).json({
    success: true,
    data: specialization,
  });
});

// @desc      Updata Specialization
// @route     PUT /api/v1/Specialization
// @access    Private
exports.updateSpecialization = asyncHandler(async (req, res, next) => {
  let specialization = await Specialization.findById(req.params.id);

  if (!specialization) {
    return next(new ErrorResponse(`هذا التخصص غير موجود`, 401));
  }
  specialization = await Specialization.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: specialization,
  });
});

// @desc      Delete Specialization
// @route     DELETE /api/v1/Specialization
// @access    Private
exports.deleteSpecialization = asyncHandler(async (req, res, next) => {
  const specialization = await Specialization.findById(req.params.id);

  if (!specialization) {
    return next(new ErrorResponse(`هذا التخصص غير موجود`, 401));
  }
  //هنا لازم اتاكد ان الادمن هو المصرح له بمسح التخصص

  specialization.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
