const express = require('express');

const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  CoursePhotoUpload,
} = require('../controllers/courses');

const Courses = require('../models/Courses');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');

const {
  ensureAuthenticated,
  forwardAuthenticated,
  roleAuthorization,
} = require('../config/auth');

router
  .route('/')
  .get(advancedResults(Courses), getCourses)
  .post(ensureAuthenticated, createCourse);

router
  .route('/:id')
  .get(ensureAuthenticated, getCourse)
  .put(ensureAuthenticated, updateCourse)
  .delete(ensureAuthenticated, deleteCourse);

router.route('/:id/photo').put(ensureAuthenticated, CoursePhotoUpload);

module.exports = router;
