const express = require('express');

const User = require('../models/User');

const {
  getMe,
  updateDetails,
  getMyID,
  UserPhotoUpload,
} = require('../controllers/user');

const router = express.Router({ mergeParams: true });

const {
  ensureAuthenticated,
  forwardAuthenticated,
  roleAuthorization,
  auth,
} = require('../config/auth');
const { route } = require('./dashboard');

router
  .route('/')
  .get(getMe, ensureAuthenticated)
  .put(updateDetails, ensureAuthenticated);

router.route('/myid').get(getMyID, forwardAuthenticated);

router
  .route('/:id/photo')
  .put(ensureAuthenticated, roleAuthorization(['admin']), UserPhotoUpload);

module.exports = router;
