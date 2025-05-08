const express = require('express');
const router = express.Router();
const { getAllActivities, createActivity } = require('../controllers/activityController');
const verifyJwtToken = require('../middlewear/auth');


router.get('/', getAllActivities); // PublicRoute
router.post('/', verifyJwtToken, createActivity); // ProtectedRoute

module.exports = router;
