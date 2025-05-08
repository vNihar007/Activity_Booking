const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config(); // Load .env variables
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_DB_URL)
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Default Route
app.get('/', (req, res) => {
    res.send("Default Route");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Router Imports
const authRoutes = require('./src/routes/authRoutes');
const activityRoutes = require('./src/routes/activityRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');

// Router+ App 
app.use('/api/auth',authRoutes);
app.use('/api/activities',activityRoutes);
app.use('/api/bookings',bookingRoutes);

module.exports = app; 