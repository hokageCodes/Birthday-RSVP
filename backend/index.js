const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = express();

const rsvpRouter = require('./routes/rsvp');

// Mount the RSVP router
app.use('/api/rsvps', rsvpRouter);

// Connect to MongoDB
mongoose.connect('mongodb+srv://Hosteet:Trucki%402023@cluster0.5aikql0.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware to parse JSON data
app.use(express.json());

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
