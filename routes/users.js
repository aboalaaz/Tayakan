const express = require('express');

const User = require('../models/User');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const router = express.Router({ mergeParams: true });

const {
  ensureAuthenticated,
  forwardAuthenticated,
  roleAuthorization,
} = require('../config/auth');

const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(
    advancedResults(User),

    getUsers
  )
  .post(createUser);

router
  .route('/:id')
  .get(ensureAuthenticated, getUser)
  .put(ensureAuthenticated, roleAuthorization(['admin', 'user']), updateUser)
  .delete(ensureAuthenticated, deleteUser);

module.exports = router;
