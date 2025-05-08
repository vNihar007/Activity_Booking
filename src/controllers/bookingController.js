const Booking = require('../models/bookingModels');
const Activity = require('../models/activityModels');
const { bookingValidationSchema } = require('../utils/validation');

const bookActivity = async (req, res) => {
  const { activityId } = req.params;
  const { error } = bookingValidationSchema.validate({ activityId });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    const existingBooking = await Booking.findOne({
      user: req.user.id,
      activity: activityId
    });

    if (existingBooking) {
      return res.status(409).json({ message: 'You have already booked this activity' });
    }

    const booking = await Booking.create({
      user: req.user.id,
      activity: activityId
    });

    return res.status(201).json({
      message: 'Activity booked successfully',
      booking
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
      error: err.message
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('activity');
    return res.status(200).json({ bookings });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to retrieve bookings',
      error: err.message
    });
  }
};

module.exports = {
  bookActivity,
  getMyBookings
};
