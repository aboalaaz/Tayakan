const express = require('express');

const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/article');
const Article = require('../models/Article');
const User = require('../models/User');

const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router
  .route('/')
  .get(advancedResults(Article), getArticles)
  .post(ensureAuthenticated, createArticle);

router
  .route('/:id')
  .get(getArticle)
  .put(ensureAuthenticated, updateArticle)
  .delete(ensureAuthenticated, deleteArticle);

module.exports = router;
