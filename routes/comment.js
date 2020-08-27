const express = require('express');

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

router
  .route('/')
  .get(advancedResults(Comment), getComments)
  .post(createComments);

router.route('/:id').get(getComment).put(updateComments).delete(deleteComments);

module.exports = router;
