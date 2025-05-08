const express = require('express');
const router = express.Router();
const { bookActivity, getMyBookings } = require('../controllers/bookingController');
const verifyJwtToken = require('../middlewear/auth');

router.post('/:activityId', verifyJwtToken, bookActivity);
router.get('/my', verifyJwtToken, getMyBookings);

module.exports = router;
