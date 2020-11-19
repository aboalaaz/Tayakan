const express = require('express');

const User = require('../models/User');

const {
  getMe,
  updateDetails,
  getMyID,
  UserPhotoUpload,
  answers,
  getResult,
  resetChapter,
} = require('../controllers/user');

const router = express.Router({ mergeParams: true });

const {
  ensureAuthenticated,
  forwardAuthenticated,
  roleAuthorization,
  auth,
} = require('../config/auth');
const { route } = require('./dashboard');

router.route('/').get(getMe).put(updateDetails, ensureAuthenticated);

router.route('/myid').get(getMyID, forwardAuthenticated);

router
  .route('/answerd')
  // .get(ensureAuthenticated, answers)
  .put(ensureAuthenticated, answers);

router.route('/result').post(ensureAuthenticated, getResult);

router.route('/reset').put(ensureAuthenticated, resetChapter);

router.route('/:id/photo').put(ensureAuthenticated, UserPhotoUpload);

module.exports = router;
