const express = require('express');
const passport = require('passport');

const {
  getComments,
  getComment,
  createComments,
  updateComments,
  deleteComments,
} = require('../controllers/comment');

const Comment = require('../models/Comment');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router
  .route('/')
  .get(advancedResults(Comment), ensureAuthenticated, getComments)
  .post(ensureAuthenticated, createComments);

router
  .route('/:id')
  .get(ensureAuthenticated, getComment)
  .put(ensureAuthenticated, updateComments)
  .delete(ensureAuthenticated, deleteComments);

module.exports = router;
