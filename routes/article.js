const express = require('express');

const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/article');
const Article = require('../models/Article');

const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router
  .route('/')
  .get(advancedResults(Article), getArticles)
  .post(createArticle);

router.route('/:id').get(getArticle).put(updateArticle).delete(deleteArticle);

module.exports = router;
