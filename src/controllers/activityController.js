const Activity = require('../models/activityModels');
const { activityValidationSchema } = require('../utils/validation');

// GET all activities (no changes)
const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};

// POST create activity with validation
const createActivity = async (req, res) => {
  try {
    const { error } = activityValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newActivity = new Activity(req.body);
    await newActivity.save();

    return res.status(201).json({
      message: 'Activity created successfully',
      activity: newActivity
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create activity', details: err.message });
  }
};

module.exports = {
  getAllActivities,
  createActivity
};