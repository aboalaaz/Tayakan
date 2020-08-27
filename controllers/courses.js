const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Courses = require('../models/Courses');

// @desc      Get all Courses
// @route     GET /api/v1/courses
// @access    private
exports.getCourses = asyncHandler(async (req, res, next) => {
  const course = await Courses.find({})
    .populate({
      path: 'specialization',
      select: 'specName',
    })
    .populate({
      path: 'chapters',
      select: 'number',
      populate: { path: 'question' },
    });
  res
    .status(200)
    .json({
      status: true,
      data: course,
    })
    .exec();
});

// @desc      Get single Course
// @route     GET /api/v1/courses/:id
// @access    private
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Courses.findById(req.params.id)
    .populate({
      path: 'specialization',
      select: 'specName',
    })
    .populate({
      path: 'chapters',
      select: 'number',
      populate: { path: 'question', select: 'question' },
    })
    .exec();

  if (!course) {
    return next(
      new ErrorResponse(`${req.params.id}` + `ID` + `لايوجد ماده بهذا الـ`)
    );
  }
  res.status(200).json({ success: true, data: course });
});

// @desc      Create new Course
// @route     post /api/v1/courses
// @access    private
exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await Courses.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc      Update Course
// @route     PUT /api/v1/courses/:id
// @access    private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Courses.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`${req.parame.id}` + `:ID` + `لايوجد ماده بهذا `)
    );
  }
  course = await Courses.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: course });
});

// @desc      Delete Course
// @route     DELETE /api/v1/courses/:id
// @access    private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Courses.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`${req.parame.id}` + `:ID` + `لايوجد ماده بهذا `)
    );
  }
  course.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
