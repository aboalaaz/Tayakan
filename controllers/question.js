const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Question = require('../models/Questions');

// @desc      Get all Questions
// @route     GET /api/v1/question
// @access    private
exports.getQuestions = asyncHandler(async (req, res, next) => {
  const question = await Question.find({}).populate({
    path: 'chapters',
    select: 'number',
    populate: { path: 'course', select: 'name' },
  });
  res.status(200).json({
    status: true,
    data: question,
  });
});
// @desc      Get single Question
// @route     GET /api/v1/question/:id
// @access    private
exports.getQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findById(req.params.id).populate({
    path: 'chapters',
    select: 'number',
    populate: { path: 'course', select: 'name' },
  });

  if (!question) {
    return next(new ErrorResponse('هذا السوال غير موجود'));
  }

  res.status(200).json({
    success: true,
    data: question,
  });
});

// @desc      Create new Question
// @route     post /api/v1/question
// @access    private
exports.createQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.create(req.body);

  res.status(201).json({
    success: true,
    data: question,
  });
});

// @desc      Update Question
// @route     PUT /api/v1/question/:id
// @access    private
exports.updateQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findByIdAndUpdate(req.params.id);

  if (!question) {
    return next(new ErrorResponse('هذا السوال غير موجود'));
  }
  // question.markModified();
  res.status(200).json({
    success: true,
    data: question,
  });
});

// @desc      Delete Question
// @route     DELETE /api/v1/question/:id
// @access    private
exports.deleteQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    return next(new ErrorResponse('هذا السوال غير موجود'));
  }

  question.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
