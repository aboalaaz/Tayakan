const express = require('express');

const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  nonAnswered,
} = require('../controllers/question');

const Question = require('../models/Questions');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router
  .route('/')
  .get(advancedResults(Question), ensureAuthenticated, getQuestions)
  .get(ensureAuthenticated, getQuestions)
  .post(createQuestion);

router.route('/nonAnswered').get(ensureAuthenticated, nonAnswered);
  
  

router
  .route('/:id')
  .get(ensureAuthenticated, getQuestion)

  .put(ensureAuthenticated, updateQuestion)
  .delete(ensureAuthenticated, deleteQuestion);
  


module.exports = router;
