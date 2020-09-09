const express = require('express');

const {
  getSpecialization,
  getSpecializations,
  createSpecialization,
  updateSpecialization,
  deleteSpecialization,
} = require('../controllers/specialization');

const Specialization = require('../models/Specialization');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router
  .route('/')
  .get(advancedResults(Specialization), ensureAuthenticated, getSpecializations)
  .post(createSpecialization, ensureAuthenticated);

router
  .route('/:id')
  .get(ensureAuthenticated, getSpecialization)
  .put(ensureAuthenticated, updateSpecialization)
  .delete(ensureAuthenticated, deleteSpecialization);

module.exports = router;
