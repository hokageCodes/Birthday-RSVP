const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));

const rsvpRouter = require('./routes/rsvp');

// Middleware to parse JSON data
app.use(express.json());

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

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
