const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Define Routes
app.use('/api/auth', require('./routes/auth.router.js'));
app.use('/api/exams', require('./routes/exams.router.js'));
app.use('/api/attempts', require('./routes/attempts.router.js'));
// Add this to your main server file
app.use('/api/admin', require('./routes/admin.router.js'));

app.get('/', (req, res) => {
  res.send({
    activeStatus:true,
    error:false,
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));