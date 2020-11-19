const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Specialization = require('../models/Specialization');
const path = require('path');
const fileUpload = require('express-fileupload');
const Courses = require('../models/Courses');

// @desc      Get all Specialization
// @route     GET /api/v1/Specialization
// @access    Private
exports.getSpecializations = asyncHandler(async (req, res, next) => {
  const specialization = await Specialization.find().populate({
    path: 'courses',
    select: 'name',
  });
  res.status(200).json({
    success: true,
    data: res.advancedResults,
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
  req.body.courses.map(async (item) => {
    let course = await Courses.findById(item);
    course = await Courses.updateOne({
      $push: { specialization: specialization._id },
    });
  });
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
    req.body
  );
  req.body.courses.map(async (item) => {
    let course = await Courses.findById(item);
    course = await Courses.updateOne({
      $push: { specialization: item },
    });
  });
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

// @desc      UPLOAD Specialization
// @route     PUT /api/v1/Specialization
// @access    Private
exports.PhotoUpload = asyncHandler(async (req, res, next) => {
  const specialization = await Specialization.findById(req.params.id);

  if (!specialization) {
    return next(
      new ErrorResponse(
        `specialization not found with id of ${req.params.id}`,
        404
      )
    );
  }

  // // Make sure user is user owner
  // if (user.user.toString() !== req.user.id && req.user.role !== 'admin') {
  //   return next(
  //     new ErrorResponse(
  //       `User ${req.params.id} is not authorized to update this user`,
  //       401
  //     )
  //   );
  //   r;
  // }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  const file = req.files.file;
  console.log(req.files);
  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }
  console.log(file);
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
  file.name = `photo_${specialization._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Specialization.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
