const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Comment = require('../models/Comment');
const User = require('../models/User');

// @desc      Get all Comments
// @route     GET /api/v1/comment
// @access    private
exports.getComments = asyncHandler(async (req, res, next) => {
  const comment = await Comment.find({})
    .populate({
      path: 'from',
      select: 'name',
    })
    .populate({
      path: 'question',
      select: 'question',
    })
    .populate({
      path: 'subcomment',
      select: 'article from',
    })
    .exec();

  if (!comment) {
    return next(new ErrorResponse(404, 'لايوجد تعليقات'));
  }

  res.status(200).json({
    success: true,
    data: res.advancedResults,
  });
});

// @desc      Get single Comment
// @route     GET /api/v1/comment/:id
// @access    private

exports.getComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id)
    .populate({
      path: 'from',
      select: 'name',
    })
    .populate({
      path: 'question',
      select: 'question',
    })
    .populate({
      path: 'subcomment',
      select: 'article from',
    })
    .exec();

  if (!comment) {
    return next(new ErrorResponse(404, 'تم مسح العليق او غير موجود'));
  }

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc      Create New Comment
// @route     POST /api/v1/comment
// @access    private
exports.createComments = asyncHandler(async (req, res, next) => {
  const comment = await Comment.create(req.body);
  const user = await User.findById(req.user.id);
  const userID = user.id;
  const commentID = comment.id;

  await Comment.findByIdAndUpdate(commentID, { $push: { from: user.id } });

  await User.findByIdAndUpdate(userID, {
    $push: { comments: commentID },
  });

  res.status(201).json({
    success: true,
    data: comment,
  });
});

// @desc      Update Comment
// @route     PUT /api/v1/comment/:id
// @access    private
exports.updateComments = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);
  console.log(comment);

  if (userId)
    if (!comment) {
      return next(new ErrorResponse(404, 'لايوجد تعليقات'));
    }

  comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc      Delete Comment
// @route     DELETE /api/v1/comment/:id
// @access    private
exports.deleteComments = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const userID = user.id;
  const comment = await Comment.findById(req.params.id);
  const commentFrom = comment.from;

  if (commentFrom == user.id || user.role === 'admin') {
    await User.findByIdAndUpdate(userID, {
      $pull: { comments: req.params.id },
    });
    await Comment.findByIdAndRemove(req.params.id);
  }

  if (!commentFrom) {
    return next(new ErrorResponse(404, 'تم مسح العليق او غير موجود'));
  }

  // comment.remove();

  res.status(201).json({
    success: true,
    data: {},
  });
});
