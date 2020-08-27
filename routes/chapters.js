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

router
  .route('/')
  .get(advancedResults(Chapters), getChapters)
  .post(createChapter);

router.route('/:id').get(getChapter).put(updateChapter).delete(deleteChapter);

module.exports = router;
