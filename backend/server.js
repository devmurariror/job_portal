const express = require('express');
const connectDB = require('./config/connectDb');
const cors = require('cors');
require('dotenv').config();  

// Initialize Express
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// Routes
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
