// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize the Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/price-checker-db', { useNewUrlParser: true, useUnifiedTopology: true });

// Check if the database connection is successful
mongoose.connection.on('connected', () => {
  console.log('Connected to the MongoDB database');
});

// Check if there's an error while connecting to the database
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to the MongoDB database:', err);
});

// Define a simple route to test the server
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
