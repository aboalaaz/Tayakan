const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Chapters = require('../models/Chapters');

// @desc      Get all Chapters
// @route     GET /api/v1/chapters
// @access    private
exports.getChapters = asyncHandler(async (req, res, next) => {
  const chapter = await Chapters.find()
    .populate({
      path: 'course',
      select: 'name',
      populate: { path: 'specialization', select: 'specName' },
    })
    .populate({ path: 'question', select: 'question' });

  res.status(200).json({
    success: true,
    data: chapter,
  });
});

// @desc      Get single Chapter
// @route     GET /api/v1/chapter/:id
// @access    private
exports.getChapter = asyncHandler(async (req, res, next) => {
  const chapter = await Chapters.findById(req.params.id).populate({
    path: 'course',
    select: 'name',
    populate: { path: 'specialization', select: 'specName' },
  });

  if (!chapter) {
    return next(new ErrorResponse(404, 'هذا الفصل غير موجود'));
  }
  res.status(200).json({
    success: true,
    data: chapter,
  });
});

// @desc      Create New Chapter
// @route     POST /api/v1/courses
// @access    private
exports.createChapter = asyncHandler(async (req, res, next) => {
  const chapter = await Chapters.create(req.body);

  res.status(201).json({
    success: true,
    data: chapter,
  });
});
// @desc      Update Course
// @route     PUT /api/v1/chapter/:id
// @access    private
exports.updateChapter = asyncHandler(async (req, res, next) => {
  let chapter = await Chapters.findById(req.params.id);

  if (!chapter) {
    return next(new ErrorResponse('هذا الفصل غير موجود'));
  }
  chapter = await Chapters.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: chapter,
  });
});

// @desc      Delete Courses
// @route     DELETE /api/v1/chapter/:id
// @access    private
exports.deleteChapter = asyncHandler(async (req, res, next) => {
  const chapter = await Chapters.findById(req.params.id);

  if (!chapter) {
    return next(new ErrorResponse('هذا الفصل غير موجود'));
  }
  chapter.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});
