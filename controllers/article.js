const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Article = require('../models/Article');

// @desc      Get all articles
// @route     GET /api/v1/article
// @access    Private/Admin
exports.getArticles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get one article
// @route     GET /api/v1/article
// @access    Private/Admin
exports.getArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: article,
  });
});

// @desc      Create article
// @route     POST /api/v1/article
// @access    Private/Admin
exports.createArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.create(req.body);

  res.status(201).json({
    success: true,
    data: article,
  });
});

// @desc      Update article
// @route     PUT /api/v1/article/:id
// @access    Private/Admin
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
// @access    Private/Admin
exports.deleteArticle = asyncHandler(async (req, res, next) => {
  await Article.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
