const express = require('express');

const {
  getChapters,
  getChapter,
  createChapter,
  updateChapter,
  deleteChapter,
} = require('../controllers/chapters');

const Chapters = require('../models/Chapters');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router
  .route('/')
  .get(advancedResults(Chapters), ensureAuthenticated, getChapters)
  .post(createChapter);

router
  .route('/:id')
  .get(ensureAuthenticated, getChapter)
  .put(ensureAuthenticated, updateChapter)
  .delete(ensureAuthenticated, deleteChapter);

module.exports = router;
