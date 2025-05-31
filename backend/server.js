const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send({
    activeStatus:true,
    error:false,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 