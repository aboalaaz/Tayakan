const express = require('express');

const {
  getSpecialization,
  getSpecializations,
  createSpecialization,
  updateSpecialization,
  deleteSpecialization,
  PhotoUpload,
} = require('../controllers/specialization');

const Specialization = require('../models/Specialization');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const {
  ensureAuthenticated,
  forwardAuthenticated,
  roleAuthorization,
} = require('../config/auth');

router
  .route('/')
  .get(advancedResults(Specialization), getSpecializations)
  .post(
    createSpecialization,
    ensureAuthenticated,
    roleAuthorization(['admin'])
  );

router
  .route('/:id')
  .get(getSpecialization)
  .put(ensureAuthenticated, updateSpecialization, roleAuthorization(['admin']))
  .delete(
    ensureAuthenticated,
    deleteSpecialization,
    roleAuthorization(['admin'])
  );

router
  .route('/:id/photo')
  .put(ensureAuthenticated, PhotoUpload, roleAuthorization(['admin']));

module.exports = router;
