const express = require('express');

const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/question');

const Question = require('../models/Questions');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router
  .route('/')
  .get(advancedResults(Question), ensureAuthenticated, getQuestions)
  .post(createQuestion);

router
  .route('/:id')
  .get(ensureAuthenticated, getQuestion)
  .put(ensureAuthenticated, updateQuestion)
  .delete(ensureAuthenticated, deleteQuestion);

module.exports = router;
