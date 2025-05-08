const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  location: String,
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Activity', activitySchema);
