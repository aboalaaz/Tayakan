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
  .get(
    advancedResults(Courses, {
      path: 'course',
      select: 'name description',
    }),
    ensureAuthenticated,
    getCourses
  )
  .post(ensureAuthenticated, createCourse);

router
  .route('/:id')
  .get(ensureAuthenticated, getCourse)
  .put(ensureAuthenticated, updateCourse)
  .delete(ensureAuthenticated, deleteCourse);

router
  .route('/:id/photo')
  .put(ensureAuthenticated, roleAuthorization(['admin']), CoursePhotoUpload);

module.exports = router;
