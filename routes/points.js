// هذا الراوت يجب المستخدمين بنائاً على الاكثر نقاطا

const express = require('express');

const { getUsersByPoints } = require('../controllers/points');

const Users = require('../models/User');

const router = express.Router({ mergeParams: true });

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const advancedResults = require('../middleware/advancedResults');

router.route('/').get(ensureAuthenticated, getUsersByPoints);

module.exports = router;
