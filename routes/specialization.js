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

router
  .route('/')
  .get(advancedResults(Specialization), getSpecializations)
  .post(createSpecialization);

router
  .route('/:id')
  .get(getSpecialization)
  .put(updateSpecialization)
  .delete(deleteSpecialization);

module.exports = router;
