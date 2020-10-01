const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Article = require('../models/Article');
const User = require('../models/User');

// @desc      Get all articles
// @route     GET /api/v1/article
// @access    Public
exports.getArticles = asyncHandler(async (req, res, next) => {
  const article = await Article.find()
    .populate({
      path: 'by',
      select: 'name',
    })
    .exec();
  res.status(200).json({
    success: true,
    data: res.advancedResults,
  });
});

// @desc      Get one article
// @route     GET /api/v1/article
// @access    Public
exports.getArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id)
    .populate({
      path: 'by',
      select: 'name',
    })
    .exec();

  res.status(200).json({
    success: true,
    data: article,
  });
});

// @desc      Create article
// @route     POST /api/v1/article
// @access    Private / User || supervisor
exports.createArticle = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  let userId = user.id;

  let articlebody = await Article.create(req.body);
  articleId = articlebody.id;

  await Article.findByIdAndUpdate(articleId, {
    $push: { by: userId },
  });

  await User.findByIdAndUpdate(userId, {
    $push: { article: articleId },
  });

  res.status(201).json({
    success: true,
    data: articlebody,
  });
});

// @desc      Update article
// @route     PUT /api/v1/article/:id
// @access    Private / Admin || User
exports.updateArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: article,
  });
});

// @desc      Delete user
// @route     DELETE /api/v1/article/:id
// @access    Private / Admin || User
exports.deleteArticle = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const article = user.article;

  if (!article) {
    return next(new ErrorResponse(`هذه المقالة غير موجوده`));
  }

  if (article.includes(req.params.id) || user.role === 'admin') {
    let userId = user.id;
    await User.findByIdAndUpdate(userId, {
      $pull: { article: req.params.id },
    });
    await Article.findByIdAndDelete(req.params.id);
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
