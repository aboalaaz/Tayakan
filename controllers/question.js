const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Question = require('../models/Questions');
const Chapters = require('../models/Chapters');
const User = require('../models/User');
const advancedResults = require('../middleware/advancedResults');

// @desc      Get all Questions
// @route     GET /api/v1/question
// @access    private
exports.getQuestions = asyncHandler(async (req, res, next) => {
  const question = await Question.find({})
    .populate({
      path: 'Chapter',
      select: 'number',
      populate: { path: 'course', select: 'name' },
    })
    .populate({ path: 'CreatedBy', select: 'name' });
    const user = await  User.findById(req.user.id);
    console.log(user);
  res.status(200).json({
    status: true,
    data: question,
  });
});


exports.nonAnswered = asyncHandler(async (req, res, next) => {
  const question = await Question.find(req.query)
    .populate({
      path: 'Chapter',
      select: 'number',
      populate: { path: 'course', select: 'name' },
    })
    .populate({ path: 'CreatedBy', select: 'name' });
  console.log(req.query)

  const user = await User.findById(req.user);

  let difference = question.filter(
    (x) => !user.successAnswer.includes(x._id) && !user.wrongAnswer.includes(x._id)
  );
  res.status(200).json({
    status: true,
    data: difference,
  });
});
// @desc      Get single Question
// @route     GET /api/v1/question/:id
// @access    private
exports.getQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findById(req.params.id)
    // .populate({
    //   path: 'chapter',
    //   select: 'name',
    //   populate: { path: 'course', select: 'name' },
    // })
    .populate({ path: 'CreatedBy', select: 'name' })
    .exec();

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
  const chapter = await Chapters.findByIdAndUpdate(question.chapter, {
    $push: { question: question._id },
  });

  res.status(201).json({
    success: true,
    data: question,
  });
});

// @desc      Update Question
// @route     PUT /api/v1/question/:id
// @access    private
exports.updateQuestion = asyncHandler(async (req, res, next) => {
  console.log(req.params.id)
  let question = await Question.findById(req.params.id);
  if (!question) {
    return next(new ErrorResponse('هذا السوال غير موجود'));
  }
  
  // Make sure user is question owner
  if (Question.user !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`غير مسموح لك بتعديل هذا السؤال`, 401));
  }

  let chapter = await Chapters.findByIdAndUpdate(question.chapter, {
    $push: { question: question._id },
  });
  
  
  question = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  
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
  const chapter = await Chapters.findByIdAndUpdate(question.chapter, {
    $pull: { question: question._id },
  });

  // make sure that the user how add the question and the admin only the users can delete the Quesiton
  if (question.user == req.user.id || req.user.role == 'admin') {
    question.remove();
  } else {
    return next(new ErrorResponse(`غير مسموح لك بحدف هذا السؤال`));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
